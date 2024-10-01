import { useEffect } from "react";

const ConfirmationModal = ({ title, message, isOpen, onClose, onConfirm }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
				<h2 className='text-xl font-bold mb-4'>{title}</h2>
				<p className='mb-4'>{message}</p>
				<div className='flex justify-end gap-4'>
					<button
						onClick={onClose}
						className='bg-gray-300 text-black p-2 rounded-md'
					>
						Cancel
					</button>
					<button
						onClick={onConfirm}
						className='bg-red-600 text-white p-2 rounded-md'
					>
						Confirm
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { forgotPassword } from "../redux/auth/authSlices";

// const ForgotPassword = () => {
// 	const [email, setEmail] = useState("");
// 	const [isModalOpen, setIsModalOpen] = useState(false); // Toggle for modal
// 	const dispatch = useDispatch();
// 	const { loading, message, error } = useSelector((state) => state.auth);

// 	// Handle form submission
// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		dispatch(forgotPassword({ email }));
// 	};

// 	// Clear messages and errors on input change
// 	const handleInputChange = (e) => {
// 		setEmail(e.target.value);
// 	};

// 	// Toggle modal visibility
// 	const toggleModal = () => {
// 		setIsModalOpen(!isModalOpen);
// 	};

// 	return (
// 		<>
// 			{/* Forgot Password Button to open modal */}
// 			<button className='text-blue-600 hover:underline' onClick={toggleModal}>
// 				Forgot Password?
// 			</button>

// 			{/* Modal with Forgot Password Form */}
// 			<ConfirmationModal
// 				title='Forgot Password'
// 				message='Enter your email to receive a password reset link.'
// 				isOpen={isModalOpen}
// 				onClose={toggleModal}
// 				onConfirm={handleSubmit}
// 			>
// 				{/* Forgot Password Form inside Modal */}
// 				<form onSubmit={handleSubmit}>
// 					<div className='mb-4'>
// 						<label
// 							htmlFor='email'
// 							className='block text-sm font-medium text-gray-700'
// 						>
// 							Email
// 						</label>
// 						<input
// 							type='email'
// 							id='email'
// 							value={email}
// 							onChange={handleInputChange}
// 							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
// 							required
// 							placeholder='Enter your email'
// 						/>
// 					</div>
// 				</form>

// 				{/* Success or Error Messages */}
// 				{message && <p className='mt-4 text-green-600 text-sm'>{message}</p>}
// 				{error && <p className='mt-4 text-red-600 text-sm'>{error}</p>}

// 				{/* Modal Actions */}
// 				<div className='flex justify-end gap-4 mt-4'>
// 					<button
// 						onClick={toggleModal}
// 						className='bg-gray-300 text-black p-2 rounded-md'
// 					>
// 						Cancel
// 					</button>
// 					<button
// 						onClick={handleSubmit}
// 						disabled={loading}
// 						className={`bg-blue-600 text-white p-2 rounded-md ${
// 							loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-700"
// 						}`}
// 					>
// 						{loading ? "Sending..." : "Send Reset Link"}
// 					</button>
// 				</div>
// 			</ConfirmationModal>
// 		</>
// 	);
// };

// export default ForgotPassword;
