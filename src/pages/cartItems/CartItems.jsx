import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchAllItems,
	clearError as clearCartError,
	clearMessage as clearCartMessage,
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
						<div className=' mt-2'>
							<Link
								to={"/checkout-form"}
								className='w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
							>
								Buy Now
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default CartItems;
