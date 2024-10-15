import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItemQuantity } from "../../redux/cartItems/cartItemsSlices";

const UpdateItemQuantity = ({ itemId, currentQuantity }) => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(currentQuantity);

	const { loading, error, message } = useSelector((state) => state.cartItem);

	// Automatically update the quantity when the input changes
	useEffect(() => {
		if (quantity !== currentQuantity) {
			dispatch(updateItemQuantity({ id: itemId, quantity })).unwrap();
		}
	}, [quantity, dispatch, itemId, currentQuantity]);

	return (
		<div className='update-item-quantity'>
			<input
				type='number'
				min='1'
				value={quantity}
				onChange={(e) => setQuantity(Number(e.target.value))}
				className='border p-2 rounded w-full text-center'
				style={{ maxWidth: "50px" }}
			/>

			{loading && <p className='text-blue-500 text-sm mt-2'>Updating...</p>}
			{error && <p className='text-red-500 text-sm mt-2'>{error}</p>}
			{message && <p className='text-green-500 text-sm mt-2'>{message}</p>}
		</div>
	);
};

export default UpdateItemQuantity;
