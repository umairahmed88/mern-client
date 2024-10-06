import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchProduct } from "../../redux/products/productSlices";

const ProductDetails = () => {
	const { product } = useSelector((state) => state.product);
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		if (id) {
			dispatch(fetchProduct(id));
		}
	}, [dispatch, id]);

	if (!product)
		return (
			<div className='flex justify-center items-center h-screen'>
				Loading...
			</div>
		);

	return (
		<div className='max-w-5xl mx-auto p-4'>
			<h1 className='text-3xl font-bold text-center mb-6'>Product Details</h1>

			{product && (
				<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
					<div className='space-y-4'>
						<div className='aspect-w-16 aspect-h-9'>
							<img
								src={
									Array.isArray(product.imageUrls)
										? product.imageUrls[0]
										: product.imageUrls
								}
								alt={product.name}
								className='w-full h-full object-cover rounded-lg shadow-lg'
							/>
						</div>

						{Array.isArray(product.imageUrls) &&
							product.imageUrls.length > 1 && (
								<div className='grid grid-cols-4 gap-4'>
									{product.imageUrls.map((url, index) => (
										<img
											key={index}
											src={url}
											alt={`Thumbnail ${index + 1}`}
											className='h-24 w-full object-cover rounded-md cursor-pointer hover:opacity-75'
										/>
									))}
								</div>
							)}
					</div>

					<div className='space-y-4'>
						<h2 className='text-2xl font-semibold'>{product.name}</h2>

						<p className='text-lg'>
							Availability Status:{" "}
							<span className='font-bold text-green-600'>
								{product.quantity}
							</span>{" "}
							units available
						</p>

						<Link
							className='inline-block mt-4 px-6 py-2 bg-zinc-700 text-white font-medium rounded hover:opacity-90 transition duration-200'
							to={`/update-product/${product._id}`}
						>
							Update Product
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
