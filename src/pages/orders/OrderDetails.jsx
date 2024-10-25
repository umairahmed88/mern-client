import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOneOrder } from "../../redux/orders/ordersSlices";

const OrderDetails = () => {
	const dispatch = useDispatch();
	const { order, loading: orderLoading } = useSelector((state) => state.order);

	const { id } = useParams();

	useEffect(() => {
		dispatch(fetchOneOrder(id)).unwrap();
	}, [dispatch, id]);

	if (orderLoading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>
				{order?._id} Details
			</h1>
			{order && (
				<div className='bg-white shadow-md rounded-lg p-6'>
					<h2 className='text-xl font-semibold mb-2'>Order ID: {order._id}</h2>
					<p className='mb-2'>
						<strong>Status:</strong> {order.orderStatus}
					</p>
					<p className='mb-2'>
						<strong>Total Amount:</strong> ${order.totalAmount}
					</p>
					<p className='mb-2'>
						<strong>Payment Method:</strong> {order.paymentMethod}
					</p>
					<p className='mb-2'>
						<strong>Payment Status:</strong> {order.paymentStatus}
					</p>
					<p className='mb-2'>
						<strong>Delivery Status:</strong> {order.deliveryStatus}
					</p>
					<h3 className='text-lg font-semibold mt-4'>Shipping Address:</h3>
					<p className='mb-2'>{order.shippingAddress?.addressLine1}</p>
					<p className='mb-2'>{order.shippingAddress?.addressLine2}</p>
					<p className='mb-2'>
						{order.shippingAddress?.city}, {order.shippingAddress?.state}{" "}
						{order.shippingAddress?.postalCode}
					</p>
					<p className='mb-2'>{order.shippingAddress?.country}</p>
					<h3 className='text-lg font-semibold mt-4'>Contact Information</h3>
					<p className='mb-2'>
						<strong>Contact Number:</strong> {order.contactNum}
					</p>
					<h3 className='text-lg font-semibold mt-4'>Cart Items</h3>
					<ul className='mb-2'>
						{order.cartItems?.map((item) => (
							<li key={item._id} className='border-b border-gray-200 py-2'>
								<div className=' flex justify-between'>
									<p>
										<strong>Product ID:</strong> {item.productId}
									</p>
									<Link
										className=' text-blue-600 px-3 hover:underline rounded-lg'
										to={`/product-details/${item.productId}`}
									>
										Details
									</Link>
								</div>
								<p>
									<strong>Quantity:</strong> {item.quantity}
								</p>
							</li>
						))}
					</ul>
					<div className=' flex justify-end'>
						<Link
							to={`/update-order/${order._id}`}
							className=' text-blue-600 px-3 hover:underline rounded-lg'
						>
							Update Order
						</Link>
					</div>
					<p className='mt-4'>
						<strong>Created At:</strong>{" "}
						{new Date(order.createdAt).toLocaleString()}
					</p>
					<p className='mt-4'>
						<strong>Updated At:</strong>{" "}
						{new Date(order.updatedAt).toLocaleString()}
					</p>
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
