import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllItems,
	clearError as clearCartError,
	clearMessage as clearCartMessage,
	deleteItem,
	clearCart,
	increaseItem,
	decreaseItem,
} from "../../redux/cartItems/cartItemsSlices";
import { useClearState } from "../../utils/useClearState";
import { Link } from "react-router-dom";

const CartItems = () => {
	const dispatch = useDispatch();

	const {
		cartItems,
		error: cartError,
		message: cartMessage,
		loading,
	} = useSelector((state) => state.cartItem);

	useEffect(() => {
		dispatch(fetchAllItems()).unwrap();
	}, [dispatch]);

	useClearState(dispatch, [
		{
			name: "product",
			error: cartError,
			message: cartMessage,
			clearError: clearCartError,
			clearMessage: clearCartMessage,
		},
	]);

	const handleIncreaseItem = (id) => {
		dispatch(increaseItem(id)).unwrap();
	};

	const handleDecreaseItem = (id) => {
		dispatch(decreaseItem(id)).unwrap();
	};

	const handleDeleteItem = (id) => {
		dispatch(deleteItem(id)).unwrap();
	};

	const clearYourCart = () => {
		dispatch(clearCart()).unwrap();
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	if (cartError)
		return (
			<div className='text-center text-red-500 text-xl py-10'>{cartError}</div>
		);

	if (cartItems.length === 0)
		return (
			<div className='text-center text-gray-500 text-xl py-10'>
				Your cart is empty.
			</div>
		);

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Your Cart</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{cartItems.map((item) => (
					<div
						key={item._id}
						className='border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'
					>
						<img
							src={item.imageUrls[0]}
							alt={item.name}
							className='w-full h-48 object-cover mb-4 rounded-lg'
						/>
						<h2 className='text-lg font-semibold'>{item.name}</h2>
						<p className='text-gray-600'>{item.description}</p>
						<p className='text-lg font-bold mt-2'>${item.price}</p>
						<p className='text-gray-500 text-sm mt-1'>Qty: {item.quantity}</p>
						<div className=' mt-2 flex gap-3'>
							<button
								className='text-green-600'
								onClick={() => handleIncreaseItem(item._id)}
							>
								+
							</button>
							<button
								className=' text-red-700 text-lg font-bold'
								onClick={() => handleDecreaseItem(item._id)}
							>
								-
							</button>
							<button
								onClick={() => handleDeleteItem(item._id)}
								className=' text-red-700'
							>
								x
							</button>
						</div>
					</div>
				))}
			</div>
			<div className='mt-3 text-end'>
				<button
					onClick={clearYourCart}
					className='bg-red-700 hover:opacity-90 p-3 rounded-lg text-white'
				>
					Clear Cart
				</button>
			</div>
			<div className='mt-3 text-end'>
				<Link
					to={"/checkout-form"}
					className='bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors duration-200'
				>
					Checkout
				</Link>
			</div>
		</div>
	);
};

export default CartItems;
