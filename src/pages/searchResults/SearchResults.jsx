import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchResults = () => {
	const { searchResults = [], loading: searchLoading } = useSelector(
		(state) => state.products
	);

	{
		searchLoading && <p>Loading...</p>;
	}

	return (
		<div className='container mx-auto px-4 py-8'>
			<h2 className='text-2xl font-semibold mb-4'>Search Results</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{searchResults && searchResults.length > 0 ? (
					searchResults.map((product) => (
						<div
							key={product._id}
							className='border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300'
						>
							<Link to={`/product/${product._id}`}>
								<img
									src={product.imageUrls[0] || "default-image-url.jpg"}
									alt={product.name}
									className='h-48 w-full object-cover rounded-md mb-4'
								/>
							</Link>
							<h3 className='text-lg font-semibold'>
								<Link
									to={`/product/${product._id}`}
									className='hover:underline'
								>
									{product.name}
								</Link>
							</h3>
							<p className='text-gray-600'>{product.description}</p>
							<p className='text-indigo-600 font-semibold mt-2'>
								Price: ${product.price}
							</p>
							<p className='text-gray-500 text-sm'>
								Category: {product.category}
							</p>
							<p className='text-gray-500 text-sm'>Brand: {product.brand}</p>
						</div>
					))
				) : (
					<p className='text-gray-600'>No products found.</p>
				)}
			</div>
		</div>
	);
};

export default SearchResults;
