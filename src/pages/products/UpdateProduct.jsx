import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchProduct } from "../../redux/products/productSlices";


const UpdateProduct = () => {
	const { product, loading } = useSelector((state) => state.product);
	const { id } = useParams();
	const dispatch = useDispatch();

	console.log(id);

	useEffect(() => {
		if(id){
		dispatch(fetchProduct(id))
	}}, [dispatch, id]);

	const [formData, setFormData] = useState({});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
		} catch (err) {
			toast.error(err);
		}
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
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='text'
						id='name'
						onChange={handleChange}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='text'
						id='name'
						onChange={handleChange}
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
