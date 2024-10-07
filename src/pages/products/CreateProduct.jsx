import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/products/productSlices";
import { Link, useNavigate } from "react-router-dom";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";

const CreateProduct = () => {
	const { loading, error, message } = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		price: "",
		quantity: "",
		imageUrls: [],
	});
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [imageUploadError, setImageUploadError] = useState(false);

	const handleImageSubmit = (e) => {
		if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
			setUploading(true);
			setImageUploadError(false);
			const promises = [];

			for (let i = 0; i < files.length; i++) {
				promises.push(storeImage(files[i]));
			}
			Promise.all(promises).then((urls) => {
				setFormData({
					...formData,
					imageUrls: formData.imageUrls.concat(urls),
				});
				setImageUploadError(false);
				setUploading(false);
			});
		} else if (files.length === 0) {
			setImageUploadError("Provide at least one image for product cover.");
			setUploading(false);
		} else {
			setImageUploadError("You can upload 6 images per product.");
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

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const res = dispatch(createProduct(formData)).unwrap();

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

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-3xl mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
				Create Product
			</h1>

			<form onSubmit={handleSubmit} className='flex flex-col gap-6'>
				<input
					type='text'
					id='name'
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
					placeholder='Product Name'
					onChange={handleChange}
					required
				/>

				<input
					type='number'
					min={0}
					id='price'
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
					placeholder='Product Price'
					onChange={handleChange}
					required
				/>

				<input
					type='number'
					min={0}
					id='quantity'
					className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
					placeholder='Product Quantity'
					onChange={handleChange}
					required
				/>

				<div className='flex justify-between items-center border-2 p-4 rounded-lg gap-4'>
					<input
						type='file'
						id='images'
						className='text-gray-700'
						onChange={(e) => setFiles(e.target.files)}
						accept='image/*'
						multiple
						required
					/>
					<button
						type='button'
						disabled={uploading}
						onClick={handleImageSubmit}
						className='bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-opacity disabled:opacity-75'
					>
						{uploading ? "Uploading..." : "Upload Images"}
					</button>
				</div>

				{formData.imageUrls.length > 0 && (
					<div className='grid grid-cols-2 gap-4'>
						{formData.imageUrls.map((url, i) => (
							<div key={url} className='relative'>
								<img
									src={url}
									alt='product'
									className='w-32 h-32 object-cover rounded-lg'
								/>
								<button
									type='button'
									onClick={() => handleRemoveImage(i)}
									className='absolute top-2 right-2 text-red-600 font-bold bg-white p-2 rounded-full hover:bg-red-600 hover:text-white transition'
								>
									&times;
								</button>
							</div>
						))}
					</div>
				)}

				<button
					disabled={loading || uploading}
					className='w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-opacity disabled:opacity-75'
				>
					{loading ? "Creating..." : "Create Product"}
				</button>

				{error && <p className='text-red-600 mt-3'>{error}</p>}
				{message && <p className='text-green-600 mt-3'>{message}</p>}
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

export default CreateProduct;
