import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	fetchProduct,
	updateProduct,
} from "../../redux/products/productSlices";

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
	const [files, setFiles] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [imageUploadError, setImageUploadError] = useState(false);

	console.log(id);

	useEffect(() => {
		if (id) {
			dispatch(fetchProduct(id));
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

	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(
				updateProduct({ id, updateData: formData })
			).unwrap();

			if (res) {
				toast.success(message);
				navigate("/products");
			}
		} catch (err) {
			toast.error(err);
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
			<h1 className=' text-2xl font-bold m-3 text-center'>Update Product</h1>
			<div className=''>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<input
						type='text'
						id='name'
						onChange={handleChange}
						defaultValue={formData.name || product.name}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='number'
						id='price'
						onChange={handleChange}
						defaultValue={formData.price || product.price}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='number'
						id='quantity'
						onChange={handleChange}
						defaultValue={formData.quantity || product.quantity}
						className='p-3 border-2 rounded-lg'
					/>
					<div className='p-3 border-2 rounded-lg'>
						<input type='file' id='name' onChange={handleChange} className='' />
					</div>
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
