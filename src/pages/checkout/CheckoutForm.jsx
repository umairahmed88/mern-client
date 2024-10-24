import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	clearCart,
	decreaseItem,
	deleteItem,
	increaseItem,
} from "../../redux/cartItems/cartItemsSlices";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../redux/orders/ordersSlices";

const CheckoutForm = () => {
	const { cartItems, loading: cartItemsLoading } = useSelector(
		(state) => state.cartItem
	);
	const { loading: orderLoading } = useSelector((state) => state.order);

	const [formData, setFormData] = useState({
		shippingAddress: {
			addressLine1: "",
			addressLine2: "",
			city: "",
			state: "",
			postalCode: "",
			country: "",
		},
		contactNum: "",
		altConNum: "",
		paymentMethod: "COD",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleIncreaseItem = (id) => {
		dispatch(increaseItem(id));
	};

	const handleDecreaseItem = (id) => {
		dispatch(decreaseItem(id));
	};

	const handleDeleteItem = (id) => {
		dispatch(deleteItem(id));
	};

	const handleEmptyCart = () => {
		dispatch(clearCart());
	};

	const handleAddressChange = (e, addressType) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[addressType]: {
				...prev[addressType],
				[name]: value,
			},
		}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await dispatch(createOrder(formData)).unwrap();

			console.log(response.paymentUrl);

			if (formData.paymentMethod === "Stripe" && response.paymentUrl) {
				window.location.href = response.paymentUrl;
			} else {
				navigate(`/order-details/${response._id}`);
			}
			console.log(response._id);
			console.log(response);
		} catch (err) {
			console.log("Order placement failed", err);
		}
	};

	if (orderLoading || cartItemsLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Checkout Form</h1>
			{cartItems.length === 0 ? (
				<div>Your cart is empty</div>
			) : (
				<div className=''>
					<ul className=' flex flex-col gap-3'>
						<h1 className=' text-center font-bold'>Your Shopping Cart</h1>
						{cartItems.map((cartItem) => (
							<li
								className=' flex justify-between items-center'
								key={cartItem._id}
							>
								<img
									src={cartItem.imageUrls}
									alt={cartItem.name}
									className=' h-10 w-10 rounded-full'
								/>
								<div className=''>
									<p>{cartItem.name}</p>
									<p>Items: {cartItem.quantity}</p>
									<div className=' flex gap-3'>
										<button
											className=' bg-green-600 px-1.5 rounded-full font-semibold text-white'
											onClick={() => handleIncreaseItem(cartItem._id)}
										>
											+
										</button>
										<button
											className=' bg-red-700 px-2 rounded-full font-semibold text-white'
											onClick={() => handleDecreaseItem(cartItem._id)}
										>
											-
										</button>
										<button
											className=' bg-red-800 px-1.5 rounded-full font-semibold text-white'
											onClick={() => handleDeleteItem(cartItem._id)}
										>
											x
										</button>
									</div>
								</div>
							</li>
						))}
						<div className=' flex justify-end'>
							<button
								onClick={handleEmptyCart}
								className=' bg-red-700 text-white px-3 rounded-lg font-bold hover:opacity-90'
							>
								Empty Your Cart
							</button>
						</div>
					</ul>
					<h1 className=' text-center text-2xl font-bold'>Order Details</h1>
					<form onSubmit={handleSubmit} className='space-y-4'>
						<h2 className='text-xl font-semibold'>Shipping Address</h2>
						<div className='grid grid-cols-2 gap-4'>
							<input
								type='text'
								name='addressLine1'
								placeholder='Address Line 1'
								value={formData.shippingAddress.addressLine1}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
								required
							/>
							<input
								type='text'
								name='addressLine2'
								placeholder='Address Line 2'
								value={formData.shippingAddress.addressLine2}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
							/>
							<input
								type='text'
								name='city'
								placeholder='City'
								value={formData.shippingAddress.city}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
								required
							/>
							<input
								type='text'
								name='state'
								placeholder='State'
								value={formData.shippingAddress.state}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
								required
							/>
							<input
								type='text'
								name='postalCode'
								placeholder='Postal Code'
								value={formData.shippingAddress.postalCode}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
								required
							/>
							<input
								type='text'
								name='country'
								placeholder='Country'
								value={formData.shippingAddress.country}
								onChange={(e) => handleAddressChange(e, "shippingAddress")}
								className='border rounded p-2 w-full'
								required
							/>
						</div>

						<h2 className='text-xl font-semibold'>Contact Information</h2>
						<div className='grid grid-cols-2 gap-4'>
							<input
								type='text'
								name='contactNum'
								placeholder='Contact Number'
								value={formData.contactNum}
								onChange={handleChange}
								className='border rounded p-2 w-full'
								required
							/>
							<input
								type='text'
								name='altConNum'
								placeholder='Alternate Contact Number'
								value={formData.altConNum}
								onChange={handleChange}
								className='border rounded p-2 w-full'
							/>
						</div>

						<h2 className='text-xl font-semibold'>Payment Method</h2>
						<div className='flex space-x-4'>
							<label className='flex items-center'>
								<input
									type='radio'
									name='paymentMethod'
									value='COD'
									checked={formData.paymentMethod === "COD"}
									onChange={handleChange}
									className='mr-2'
								/>
								Cash on Delivery
							</label>
							<label className='flex items-center'>
								<input
									type='radio'
									name='paymentMethod'
									value='Stripe'
									checked={formData.paymentMethod === "Stripe"}
									onChange={handleChange}
									className='mr-2'
								/>
								Stripe
							</label>
						</div>

						<button
							type='submit'
							className='bg-indigo-600 text-white p-2 rounded mt-4 w-full hover:opacity-90'
						>
							Place Order
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default CheckoutForm;
