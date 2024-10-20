import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearError as clearProductError,
	clearMessage as clearProductMessage,
	fetchProduct,
	updateProduct,
} from "../../redux/products/productSlices";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useClearState } from "../../utils/useClearState";

const UpdateProduct = () => {
	const {
		product = {},
		loading: productLoading,
		error: productError,
		message: productMessage,
	} = useSelector((state) => state.product);

	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [imageUploadError, setImageUploadError] = useState(false);

	useClearState(dispatch, [
		{
			name: "product",
			error: productError,
			message: productMessage,
			clearError: clearProductError,
			clearMessage: clearProductMessage,
		},
	]);

	useEffect(() => {
		if (id) {
			dispatch(fetchProduct(id)).unwrap();
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (product) {
			setFormData({
				name: product.name,
				price: product.price,
				quantity: product.quantity,
				imageUrls: product.imageUrls,
			});
		}
	}, [product]);

	const handleImageSubmit = (e) => {
		if (files.length + (formData.imageUrls || []).length > 6) {
			setImageUploadError("You can upload a maximum of 6 images per product.");
			toast.error("You can upload a maximum of 6 images per product.");
			setUploading(false);
			return;
		}

		setUploading(true);
		setImageUploadError(false);
		const promises = [];

		for (let i = 0; i < files.length; i++) {
			if (files[i].size < 5000000 && files[i].type.startsWith("image/")) {
				promises.push(storeImage(files[i]));
			} else {
				setImageUploadError("File too large or invalid file type");
				toast.error("File too large or invalid file type");
				setUploading(false);
				return;
			}
		}

		return Promise.all(promises)
			.then((urls) => {
				setFormData({
					...formData,
					imageUrls: formData.imageUrls.concat(urls),
				});
				setImageUploadError(false);
				setUploading(false);
				setFiles([]);
			})
			.catch((err) => {
				setImageUploadError("Image upload error");
				toast.error("Image upload error");
				setUploading(false);
			});
	};

	const storeImage = async (file) => {
		return new Promise((resolve, reject) => {
			const storage = getStorage(app);
			const fileName = new Date().getTime() + file.name;
			const storageRef = ref(storage, fileName);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(err) => {
					reject(err);
				},
				async () => {
					await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						resolve(downloadURL);
					});
				}
			);
		});
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (uploading) {
			toast.error("Please wait for image upload to finish.");
			return;
		}
		await handleImageSubmit();

		if (!formData.imageUrls || formData.imageUrls.length === 0) {
			toast.error("At least one image is required for the product.");
			return;
		}

		try {
			const res = await dispatch(
				updateProduct({ id, updateData: formData })
			).unwrap();

			if (res) {
				navigate("/products");
			}
		} catch (err) {}
	};

	const handleRemoveImage = (index) => {
		setFormData({
			...formData,
			imageUrls: formData.imageUrls.filter((_, i) => i !== index),
		});
	};

	if (productLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>{`Update ${
				product?.name || formData?.name
			}`}</h1>

			<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
				<input
					type='text'
					id='name'
					onChange={handleChange}
					defaultValue={formData?.name || product?.name}
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-teal-500'
					placeholder='Product Name'
					required
				/>

				<input
					type='number'
					id='price'
					onChange={handleChange}
					defaultValue={formData?.price || product?.price}
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-teal-500'
					placeholder='Product Price'
					required
				/>

				<input
					type='number'
					id='quantity'
					onChange={handleChange}
					defaultValue={formData?.quantity || product?.quantity}
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-teal-500'
					placeholder='Product Quantity'
					required
				/>

				<div className='p-4 border-2 rounded-lg flex justify-between items-center'>
					<input
						type='file'
						id='images'
						onChange={(e) => setFiles(e.target.files)}
						className='text-gray-700'
						accept='image/*'
						multiple
					/>
					<button
						type='button'
						onClick={handleImageSubmit}
						className='py-2 px-4 bg-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-75'
						disabled={uploading}
					>
						{uploading ? "Uploading..." : "Upload Images"}
					</button>
				</div>

				{formData?.imageUrls?.length > 0 && (
					<div className='grid grid-cols-2 gap-4'>
						{formData?.imageUrls.map((url, i) => (
							<div key={url} className='relative'>
								<img
									src={url}
									alt={formData?.name || product?.name}
									className='w-32 h-32 object-cover rounded-lg'
								/>
								<button
									type='button'
									onClick={() => handleRemoveImage(i)}
									className='absolute top-2 right-2 text-red-600 font-bold bg-white p-2 rounded-full hover:opacity-90 transition'
								>
									&times;
								</button>
							</div>
						))}
					</div>
				)}

				<button
					disabled={productLoading || uploading}
					className='w-full py-3 bg-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-75'
				>
					{productLoading ? "Updating..." : "Update Product"}
				</button>
			</form>

			<div className='flex justify-end mt-6'>
				<Link
					to='/products'
					className='py-3 px-6 bg-red-600 text-white rounded-lg hover:opacity-90 transition-opacity'
				>
					Cancel
				</Link>
			</div>
		</div>
	);
};

export default UpdateProduct;
