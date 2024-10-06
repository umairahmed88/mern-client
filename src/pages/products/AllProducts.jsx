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

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	if (error) return <div className='text-center text-red-600'>{error}</div>;

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8 text-center'>All Products</h1>
			{products.length > 0 && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{products.map((product) => (
						<div
							className='p-6 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
							key={product._id}
						>
							<Link
								to={`/product-details/${product._id}`}
								className='block mb-4'
							>
								<img
									src={product.imageUrls}
									alt={product.name}
									className='h-48 w-full object-contain rounded-md'
								/>
							</Link>
							<div className='text-center'>
								<h2 className='text-lg font-semibold text-gray-800'>
									{product.name}
								</h2>
								<p className='text-xl font-bold text-green-600 mt-1'>
									${product.price}
								</p>
								<p className='text-sm text-gray-600 mt-2'>
									Quantity:{" "}
									<span className='font-semibold text-gray-800'>
										{product.quantity}
									</span>
								</p>

								<div className='mt-4 flex justify-center gap-2'>
									<button
										onClick={() => handleIncreaseProduct(product._id)}
										className='bg-green-500 text-white px-4 py-1 rounded-full hover:bg-green-600 transition duration-300'
									>
										+
									</button>
									<button
										onClick={() => handleDecreaseProduct(product._id)}
										className='bg-red-500 text-white px-4 py-1 rounded-full hover:bg-red-600 transition duration-300'
									>
										-
									</button>
									<button
										onClick={() => toggleProductModal(product._id)}
										className='bg-red-700 text-white px-4 py-1 rounded-full hover:bg-red-800 transition duration-300'
									>
										x
									</button>
								</div>

								<Link
									className='block mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300'
									to={`/update-product/${product._id}`}
								>
									Update
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
			{products.length > 0 && (
				<div className='flex justify-end mt-6'>
					<button
						onClick={toggleModal}
						className='bg-red-700 text-white py-2 px-6 rounded-lg hover:opacity-90 transition duration-300'
					>
						Delete All Products
					</button>
				</div>
			)}
			<ConfirmationModal
				isOpen={isModalOpen}
				title='Confirm Delete'
				message='Are you sure you want to delete all products?'
				onClose={toggleModal}
				onConfirm={() => {
					toggleModal();
					handleDeleteAllProduct();
				}}
			/>
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
