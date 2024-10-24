import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteAllOrders,
	deleteOrder,
	fetchAllOrders,
} from "../../redux/orders/ordersSlices";
import { Link } from "react-router-dom";

const Orders = () => {
	const dispatch = useDispatch();
	const { orders = [], loading: orderLoading } = useSelector(
		(state) => state.order
	);

	useEffect(() => {
		dispatch(fetchAllOrders()).unwrap();
	}, [dispatch]);

	const handleDeleteOrder = (id) => {
		dispatch(deleteOrder(id)).unwrap();
	};

	const handleDeleteAllOrders = () => {
		dispatch(deleteAllOrders()).unwrap();
	};

	if (orderLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Orders</h1>
			<div className=''>
				{orders &&
					orders.map((order) => (
						<div className=' flex items-center justify-between' key={order._id}>
							{order._id}
							<p>{order.paymentStatus}</p>
							<p>{order.deliveryStatus}</p>
							<div className=' flex flex-col'>
								<Link
									className=' text-blue-600 px-3 hover:underline rounded-lg'
									to={`/order-details/${order._id}`}
								>
									Details
								</Link>
								<button
									onClick={() => handleDeleteOrder(order._id)}
									className=' text-red-600 px-3 hover:underline rounded-lg'
								>
									Delete
								</button>
							</div>
						</div>
					))}
			</div>
			{orders.length > 0 && (
				<div className=' flex justify-end mt-6'>
					<button
						onClick={handleDeleteAllOrders}
						className=' bg-red-700 text-white p-1.5 font-bold rounded-lg'
					>
						Delete All Orders
					</button>
				</div>
			)}
		</div>
	);
};

export default Orders;
