import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../redux/products/productSlices";
import { useNavigate } from "react-router-dom";
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
		} catch (err) {
			console.error(err);
		}
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
			<h1 className=' text-2xl font-bold m-3 text-center'>Create Product</h1>
			<div className=''>
				<form onSubmit={handleSubmit} className=' flex flex-col gap-3'>
					<input
						type='text'
						id='name'
						className=' border-2 p-3 rounded-lg'
						placeholder='Product Name'
						onChange={handleChange}
						required
					/>
					<input
						type='number'
						min={0}
						id='price'
						className=' border-2 p-3 rounded-lg'
						placeholder='Product Price'
						onChange={handleChange}
						required
					/>
					<input
						type='number'
						id='quantity'
						className=' border-2 p-3 rounded-lg'
						placeholder='Product Quantity'
						onChange={handleChange}
						required
					/>
					<div className=' flex justify-between border-2 p-3 rounded-lg'>
						<input
							type='file'
							id='name'
							className=''
							placeholder='Product Name'
							onChange={(e) => setFiles(e.target.files)}
							accept='image/*'
							multiple
							required
						/>
						<button
							disabled={uploading}
							onClick={handleImageSubmit}
							className=' p-2 rounded-lg border-2 border-black disabled:opacity-75'
						>
							{uploading ? "Uploading..." : "Upload"}
						</button>
					</div>
					{formData.imageUrls.length > 0 &&
						formData.imageUrls.map((url, i) => (
							<div className='' key={url}>
								<img
									src={url}
									alt='product'
									className='w-20 h-20 object-contain rounded-lg'
								/>
								<button
									onClick={handleRemoveImage(i)}
									className=' text-red-700 p-3 rounded-lg uppercase hover:opacity-75'
								>
									Delete
								</button>
							</div>
						))}
					<button
						disabled={loading || uploading}
						className='bg-zinc-600 p-3 rounded-lg text-white opacity-90 disabled:opacity-90'
					>
						{loading ? "Creating..." : "Create Product"}
					</button>
					{error && <p>{error}</p>}
					{message && <p>{message}</p>}
				</form>
			</div>
			{/* <div className=''>Loading...</div> */}
		</div>
	);
};

export default CreateProduct;
