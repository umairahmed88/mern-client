// Search.js
import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../redux/products/productSlices";

const Search = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [searchTerm, setSearchTerm] = useState("");
	const { loading: searchLoading } = useSelector((state) => state.product);

	const handleInputChange = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		dispatch(searchProduct({ searchTerm })).unwrap();
		navigate("/search-results");
	};

	return (
		<form onSubmit={handleSearchSubmit} className='relative mx-4'>
			<input
				type='text'
				value={searchTerm}
				onChange={handleInputChange}
				placeholder='Search products...'
				className='p-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400'
			/>
			<button
				type='submit'
				className='absolute right-1 top-1 p-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-700'
			>
				{" "}
				{searchLoading ? (
					<div className='spinner border-t-transparent border-4 border-white rounded-full w-4 h-4 animate-spin'></div>
				) : (
					<HiSearch />
				)}
			</button>
		</form>
	);
};

export default Search;
