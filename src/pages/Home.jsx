import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
	fetchAllProducts,
} from "../redux/products/productSlices";
import {
	addToCart,
} from "../redux/cartItems/cartItemsSlices";

const Home = () => {
	const {
		products = [],
		loading: productLoading,
	} = useSelector((state) => state.product);

	const {
		loading: cartLoading,
	} = useSelector((state) => state.cartItem);

	const dispatch = useDispatch();

	useEffect(() => {
		if (!products.length) {
			dispatch(fetchAllProducts())
				.unwrap()
				.catch((err) => {
					console.error("Failed to load products:", err);
				});
		}
	}, [dispatch, products.length]);

	const handleAddToCart = async (productId, quantity = 1) => {
		await dispatch(addToCart({ productId, quantity })).unwrap();
	};

	if (productLoading || cartLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-8 text-center'>Shopping World</h1>

			{products.length > 0 && (
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
					{products.map((product) => (
						<div
							className='p-4 border border-gray-200 rounded-lg shadow-lg flex flex-col justify-between items-center bg-white hover:shadow-xl transition-shadow duration-300'
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
								<p className='text-lg font-semibold text-gray-800'>
									{product.name}
								</p>
								<p className='text-xl font-bold text-green-600 mt-1'>
									${product.price}
								</p>
								<p className='text-sm text-gray-600 mt-2'>
									Stock:{" "}
									<span className='font-semibold text-gray-800'>
										{product.quantity}
									</span>
								</p>
							</div>
							<button
								onClick={() => handleAddToCart(product._id)}
								className='mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400'
							>
								Add to Cart
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;

// import { useDispatch, useSelector } from "react-redux";
// import { useClearState } from "../utils/useClearState";
// import {
// 	clearError,
// 	clearMessage,
// 	fetchAllProducts,
// } from "../redux/products/productSlices";
// import { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { addToCart } from "../redux/cartItems/cartItemsSlices";

// const Home = () => {
// 	const {
// 		products = [],
// 		loading,
// 		error,
// 		message,
// 	} = useSelector((state) => state.product);
// 	const dispatch = useDispatch();

// 	console.log(products);

// 	useClearState(dispatch, clearMessage, clearError, error, message);

// 	useEffect(() => {
// 		if (!products.length) {
// 			dispatch(fetchAllProducts())
// 				.unwrap()
// 				.catch((err) => {
// 					console.error("Failed to load products:", err);
// 				});
// 		}
// 	}, [dispatch, products.length]);

// 	const handleAddToCart = async (productId, quantity = 1) => {
// 		await dispatch(addToCart({ productId, quantity })).unwrap();
// 	};

// 	if (loading)
// 		return <div className='text-center text-xl py-10'>Loading...</div>;

// 	return (
// 		<div className='max-w-7xl mx-auto px-4 py-8'>
// 			<h1 className='text-3xl font-bold mb-8 text-center'>Shopping World</h1>

// 			{products.length > 0 && (
// 				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
// 					{products.map((product) => (
// 						<div
// 							className='p-4 border border-gray-200 rounded-lg shadow-lg flex flex-col justify-between items-center bg-white hover:shadow-xl transition-shadow duration-300'
// 							key={product._id}
// 						>
// 							<Link
// 								to={`/product-details/${product._id}`}
// 								className='block mb-4'
// 							>
// 								<img
// 									src={product.imageUrls}
// 									alt={product.name}
// 									className='h-48 w-full object-contain rounded-md'
// 								/>
// 							</Link>
// 							<div className='text-center'>
// 								<p className='text-lg font-semibold text-gray-800'>
// 									{product.name}
// 								</p>
// 								<p className='text-xl font-bold text-green-600 mt-1'>
// 									${product.price}
// 								</p>
// 								<p className='text-sm text-gray-600 mt-2'>
// 									Stock:{" "}
// 									<span className='font-semibold text-gray-800'>
// 										{product.quantity}
// 									</span>
// 								</p>
// 							</div>
// 							<button
// 								onClick={() => handleAddToCart(product._id)}
// 								className='mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400'
// 							>
// 								Add to Cart
// 							</button>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Home;
