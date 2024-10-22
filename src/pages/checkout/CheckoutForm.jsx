import { useState } from "react";
import { useDispatch } from "react-redux";

const CheckoutForm = () => {
	const [formData, setFormData] = useState({});
	const dispatch = useDispatch();

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className='container mx-auto py-10'>
			<h1 className='text-2xl font-bold mb-6 text-center'>Checkout Form</h1>
			<div className=''>
				<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
					<input
						type='text'
						name=''
						id=''
						onChange={handleChange}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='text'
						name=''
						id=''
						onChange={handleChange}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='text'
						name=''
						id=''
						onChange={handleChange}
						className='p-3 border-2 rounded-lg'
					/>
					<input
						type='text'
						name=''
						id=''
						onChange={handleChange}
						className='p-3 border-2 rounded-lg'
					/>
					<button>Place Order</button>
				</form>
			</div>
		</div>
	);
};

export default CheckoutForm;
