import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../redux/products/productSlices";

const AllProducts = () => {
	const { products = [] } = useSelector((state) => state.product);
	const dispatch = useDispatch();

	console.log(products);

	useEffect(() => {
		dispatch(fetchAllProducts()).unwrap();
	}, [dispatch]);

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Products</h1>
			<div className=''>Loading...</div>
		</div>
	);
};

export default AllProducts;
