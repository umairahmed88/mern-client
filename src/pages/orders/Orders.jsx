import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	deleteAllOrders,
	deleteOrder,
	fetchAllOrders,
} from "../../redux/orders/ordersSlices";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../components/Modal";

const Orders = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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

	const confirmDeleteAllOrders = () => {
		handleDeleteAllOrders();
		closeModal();
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
						onClick={openModal}
						className='bg-red-700 hover:opacity-90 p-3 rounded-lg text-white'
					>
						Delete All Orders
					</button>
				</div>
			)}
			<ConfirmationModal
				title='Delete All Orders'
				message='Are you sure you want to delete all orders? This action cannot be undone.'
				isOpen={isModalOpen}
				onClose={closeModal}
				onConfirm={confirmDeleteAllOrders}
			/>
		</div>
	);
};

export default Orders;
