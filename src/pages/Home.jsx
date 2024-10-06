import { useDispatch, useSelector } from "react-redux";
import { useClearState } from "../utils/useClearState";
import {
	clearError,
	clearMessage,
	fetchAllProducts,
} from "../redux/products/productSlices";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartItems/cartItemsSlices";

const Home = () => {
	const {
		products = [],
		loading,
		error,
		message,
	} = useSelector((state) => state.product);
	const dispatch = useDispatch();

	console.log(products);

	useClearState(dispatch, clearMessage, clearError, error, message);

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

	if (loading) return <div className=''>Loading...</div>;

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
									<button
										onClick={() => handleAddToCart(product._id)}
										className='bg-zinc-600  px-1 rounded-lg text-white hover:opacity-90'
									>
										add to cart
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Home;
