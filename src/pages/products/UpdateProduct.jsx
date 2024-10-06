import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	clearError,
	clearMessage,
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
		loading,
		message,
		error,
	} = useSelector((state) => state.product);
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [imageUploadError, setImageUploadError] = useState(false);

	useClearState(dispatch, clearMessage, clearError, error, message);

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
		if (
			files.length > 0 &&
			files.length + (formData.imageUrls || []).length < 7
		) {
			setUploading(true);
			setImageUploadError(false);
			const promises = [];

			for (let i = 0; i < files.length; i++) {
				if (files[i].size < 5000000 && files[i].type.startsWith("image/")) {
					promises.push(storeImage(files[i]));
				} else {
					setImageUploadError("File too large or invalid file type");
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
					setUploading(false);
				});
		} else {
			setImageUploadError("You can upload 6 images per product.");
			toast.error("You can upload 6 images per product.");
			setUploading(false);
		}
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

	if (loading) return <div className=''>Loading...</div>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>{`Update ${
				product?.name || formData?.name
			}`}</h1>
			<div className=''>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<input
						type='text'
						id='name'
						onChange={handleChange}
						defaultValue={formData?.name || product?.name}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='number'
						id='price'
						onChange={handleChange}
						defaultValue={formData?.price || product?.price}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='number'
						id='quantity'
						onChange={handleChange}
						defaultValue={formData?.quantity || product?.quantity}
						className='p-3 border-2 rounded-lg'
					/>
					<div className='p-3 border-2 rounded-lg flex justify-between'>
						<input
							type='file'
							id='images'
							onChange={(e) => setFiles(e.target.files)}
							className=''
							accept='image/*'
							multiple
						/>
						<button
							onClick={handleImageSubmit}
							className=' bg-zinc-600 p-3 rounded-lg text-white hover:opacity-90 disabled:opacity-90'
						>
							{uploading ? "Uploading..." : "Upload"}
						</button>
					</div>
					{formData?.imageUrls?.length > 0 &&
						formData?.imageUrls?.map((url, i) => (
							<div
								className=' flex justify-between items-center p-2 shadow-md border-2'
								key={url}
							>
								<img
									src={url}
									alt={formData?.name || product?.name}
									className=' h-24 w-24 object-contain'
								/>
								<button
									onClick={() => handleRemoveImage(i)}
									className='text-red-700 p-3 uppercase hover:opacity-75'
								>
									Delete
								</button>
							</div>
						))}
					<button
						disabled={loading}
						className='p-3 rounded-lg hover:opacity-90 bg-zinc-600 text-white disabled:opacity-75'
					>
						{loading ? "Updating..." : "Update"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default UpdateProduct;
