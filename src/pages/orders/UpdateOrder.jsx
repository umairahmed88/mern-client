import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { fetchOneOrder, updateOrder } from "../../redux/orders/ordersSlices";

const UpdateOrder = () => {
	const dispatch = useDispatch();
	const { order, loading: orderLoading } = useSelector((state) => state.order);

	const { id } = useParams();
	const [orderStatus, setOrderStatus] = useState("");
	const [paymentStatus, setPaymentStatus] = useState("");
	const [deliveryStatus, setDeliveryStatus] = useState("");

	useEffect(() => {
		dispatch(fetchOneOrder(id)).unwrap();
	}, [dispatch, id]);

	useEffect(() => {
		if (order) {
			setOrderStatus(order.orderStatus);
			setPaymentStatus(order.paymentStatus);
			setDeliveryStatus(order.deliveryStatus);
		}
	}, [order]);

	const handleUpdate = () => {
		dispatch(
			updateOrder({
				id,
				updateData: { orderStatus, paymentStatus, deliveryStatus },
			})
		);
		Navigate("/orders");
	};

	if (orderLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>
				Update {order?._id} Details
			</h1>
			{order && (
				<div>
					<h1 className='text-2xl font-bold mb-4 text-center'>Update Order</h1>
					<div className='mb-4'>
						<label className='block text-gray-700'>Order Status:</label>
						<div className='flex space-x-4'>
							{["Processing", "Shipped", "Delivered", "Cancelled"].map(
								(status) => (
									<label key={status} className='inline-flex items-center'>
										<input
											type='radio'
											name='orderStatus'
											value={status}
											checked={orderStatus === status}
											onChange={(e) => setOrderStatus(e.target.value)}
											className='form-radio'
											required
										/>
										<span className='ml-2'>{status}</span>
									</label>
								)
							)}
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Payment Status:</label>
						<div className='flex space-x-4'>
							{["Paid", "Failed"].map((status) => (
								<label key={status} className='inline-flex items-center'>
									<input
										type='radio'
										name='paymentStatus'
										value={status}
										checked={paymentStatus === status}
										onChange={(e) => setPaymentStatus(e.target.value)}
										className='form-radio'
										required
									/>
									<span className='ml-2'>{status}</span>
								</label>
							))}
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Delivery Status:</label>
						<div className='flex space-x-4'>
							{[
								"Processing",
								"Dispatched",
								"Shipped",
								"Delivered",
								"Cancelled",
							].map((status) => (
								<label key={status} className='inline-flex items-center'>
									<input
										type='radio'
										name='deliveryStatus'
										value={status}
										checked={deliveryStatus === status}
										onChange={(e) => setDeliveryStatus(e.target.value)}
										className='form-radio'
										required
									/>
									<span className='ml-2'>{status}</span>
								</label>
							))}
						</div>
					</div>
					<div className=' flex justify-center'>
						<button
							onClick={handleUpdate}
							className='bg-indigo-600 font-bold text-white px-4 py-2 rounded hover:opacity-90'
						>
							{orderLoading ? "Updating..." : "Update Order"}
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default UpdateOrder;
