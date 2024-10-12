import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems } from "../../redux/cartItems/cartItemsSlices"; // Make sure your slice is correctly imported

const CartItems = () => {
	const dispatch = useDispatch();

	// Destructure necessary fields from the Redux state
	const {
		cartItems,
		error: cartError,
		message: cartMessage,
		loading,
	} = useSelector((state) => state.cartItem);

	console.log("cartItems are: ", cartItems);

	// Dispatch the fetchAllItems action on component mount
	useEffect(() => {
		const res = dispatch(fetchAllItems())
			.unwrap()
			.catch((err) => {
				console.error("Failed to load products:", err);
			});

		console.log("response is :", res);
	}, [dispatch]);

	// Conditional rendering based on the loading state
	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	// Display error message if there's an error
	if (cartError)
		return (
			<div className='text-center text-red-500 text-xl py-10'>{cartError}</div>
		);

	// If there are no cart items, show a message
	if (cartItems?.length === 0)
		return (
			<div className='text-center text-gray-500 text-xl py-10'>
				Your cart is empty.
			</div>
		);

	// Map through cartItems and render each item
	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Your Cart</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{cartItems?.map((item) => (
					<div
						key={item._id}
						className='border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200'
					>
						<img
							src={item.imageUrls[0]} // Assuming there's at least one image URL
							alt={item.name}
							className='w-full h-48 object-cover mb-4 rounded-lg'
						/>
						<h2 className='text-lg font-semibold'>{item.name}</h2>
						<p className='text-gray-600'>{item.description}</p>
						<p className='text-lg font-bold mt-2'>${item.price}</p>
						<p className='text-gray-500 text-sm mt-1'>
							{item.availableStock} in stock
						</p>
						<button className='mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'>
							Buy Now
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default CartItems;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchAllItems } from "../../redux/cartItems/cartItemsSlices";

// const CartItems = () => {
// 	const {
// 		cartItems,
// 		error: cartError,
// 		message: cartMessage,
// 		loading,
// 	} = useSelector((state) => state.cartItem);
// 	const dispatch = useDispatch();

// 	console.log(cartItems);

// 	useEffect(() => {
// 		if (cartItems.length) {
// 			dispatch(fetchAllItems())
// 				.unwrap()
// 				.catch((err) => {
// 					console.error("Failed to load products:", err);
// 				});
// 		}
// 	}, [dispatch, fetchAllItems]);

// 	if (loading)
// 		return <div className='text-center text-xl py-10'>Loading...</div>;

// 	return <div>CartItems</div>;
// };

// export default CartItems;
