import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllItems } from "../../redux/cartItems/cartItemsSlices";

const CartItems = () => {
	const {
		cartItems,
		error: cartError,
		message: cartMessage,
		loading,
	} = useSelector((state) => state.cartItem);
	const dispatch = useDispatch();

	console.log(cartItems);

	useEffect(() => {
		if (cartItems.length) {
			dispatch(fetchAllItems())
				.unwrap()
				.catch((err) => {
					console.error("Failed to load products:", err);
				});
		}
	}, [dispatch, fetchAllItems]);

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return <div>CartItems</div>;
};

export default CartItems;
