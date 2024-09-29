import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/products/productSlices";

const AllProducts = () => {
	const { products = [], loading } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	console.log(products);

	useEffect(() => {
		if (products) {
			dispatch(fetchAllProducts()).unwrap();
		}
	}, [dispatch]);

	if (loading) return <div className=''>Loading...</div>;
	if (!products) return <div className=''>No product available</div>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Products</h1>
			<div className=''>Loading...</div>
			<div className=''>
				{products &&
					products.map((product) => (
						<div className='' key={product._id}>
							<img
								src={product.imageUrls}
								alt=''
								className='h-24 w-24 object-contain rounded'
							/>
						</div>
					))}
			</div>
		</div>
	);
};

export default AllProducts;
