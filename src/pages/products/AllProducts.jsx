import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError,
	clearMessage,
	decreaseProduct,
	deleteAllProducts,
	deleteProduct,
	fetchAllProducts,
	increaseProduct,
} from "../../redux/products/productSlices";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../components/Modal";
import { useClearState } from "../../utils/useClearState";

const AllProducts = () => {
	const {
		products = [],
		loading,
		error,
		message,
	} = useSelector((state) => state.product);
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isProductModalOpen, setIsProductModalOpen] = useState(false); // State for individual product delete modal
	const [selectedProductId, setSelectedProductId] = useState(null); // Store product id to delete

	useClearState(dispatch, clearMessage, clearError, error, message);

	console.log(products);

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchAllProducts())
				.unwrap()
				.catch((err) => {
					console.error("Failed to load products:", err);
				});
		}
	}, [dispatch, products.length]);

	const handleDelete = (id) => {
		dispatch(deleteProduct(id)).unwrap();
	};

	const handleIncreaseProduct = (id) => {
		dispatch(increaseProduct(id)).unwrap();
	};

	const handleDecreaseProduct = (id) => {
		dispatch(decreaseProduct(id)).unwrap();
	};

	const handleDeleteAllProduct = () => {
		dispatch(deleteAllProducts()).unwrap();
	};

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const toggleProductModal = (id) => {
		setSelectedProductId(id);
		setIsProductModalOpen((prev) => !prev);
	};

	if (loading) return <div>Loading...</div>;

	if (error) return <div>Error: {error}</div>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className='text-2xl font-bold m-3 text-center'>Products</h1>

			{products.length > 0 && (
				<div className='grid grid-cols-1 gap-4'>
					{products.map((product) => (
						<div
							className='p-4 border rounded shadow-md flex justify-between items-center'
							key={product._id}
						>
							<Link
								to={`/product-details/${product._id}`}
								className='text-blue-600 hover:underline'
							>
								<img
									src={product.imageUrls}
									alt={product.name}
									className='h-32 w-32 object-contain rounded-lg'
								/>
							</Link>
							<div className=''>
								<div className='mt-2'>
									<p>
										Name: <span className='font-bold'>{product.name}</span>
									</p>
									<p>
										Price: <span className='font-bold'>${product.price}</span>
									</p>
									<p>
										Quantity:{" "}
										<span className='font-bold'>{product.quantity}</span>
									</p>
									<div className='flex gap-2 m-2'>
										<button
											onClick={() => handleIncreaseProduct(product._id)}
											className='bg-green-600  px-1 rounded-full text-white'
										>
											+
										</button>
										<button
											onClick={() => handleDecreaseProduct(product._id)}
											className='bg-red-700  px-1.5 rounded-full text-white'
										>
											-
										</button>
										<button
											onClick={() => toggleProductModal(product._id)}
											className='bg-red-700  px-1 rounded-full text-white'
										>
											X
										</button>
									</div>
									<Link
										className='bg-green-600 p-1 text-white rounded-lg'
										to={`/update-product/${product._id}`}
									>
										Update
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
			{products.length > 0 && (
				<div className=' m-2 flex justify-end'>
					<button
						onClick={toggleModal}
						className=' bg-red-700 text-white p-3 hover:opacity-90 rounded-lg'
					>
						Delete All Products
					</button>
					<ConfirmationModal
						isOpen={isModalOpen}
						title='Confirm Signout'
						message='Are you sure you want to delete all products?'
						onClose={toggleModal}
						onConfirm={() => {
							toggleModal();
							handleDeleteAllProduct();
						}}
					/>
				</div>
			)}
			<ConfirmationModal
				isOpen={isProductModalOpen}
				title='Confirm Delete Product'
				message={`Are you sure you want to delete the product "${
					products.find((product) => product._id === selectedProductId)?.name
				}"?`}
				onClose={toggleProductModal}
				onConfirm={() => {
					handleDelete(selectedProductId);
					setSelectedProductId(null);
					toggleProductModal();
				}}
			/>
		</div>
	);
};

export default AllProducts;
