import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../redux/auth/authSlices";
import { toast } from "react-toastify";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const dispatch = useDispatch();
	const { loading, message, error } = useSelector((state) => state.auth);
	const [isOpen, setIsOpen] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault(); // Prevent form from reloading the page

		try {
			// Dispatch the forgotPassword action and wait for the result
			const res = await dispatch(forgotPassword({ email })).unwrap();

			// Show success toast
			toast.success(res.message);

			// Close the modal only after the success toast is triggered
			setIsOpen(false);
		} catch (err) {
			// Show error toast
			toast.error(
				err?.message || "An error occurred while sending the reset link"
			);
		}
	};

	// Clear messages and errors on input change
	const handleInputChange = (e) => {
		setEmail(e.target.value);
	};

	// Toggle modal visibility
	const toggleModal = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className=' m-2'>
			{/* Button to open modal */}
			<div className='flex justify-end'>
				<button className='text-red-700 hover:underline' onClick={toggleModal}>
					Forgot Password?
				</button>
			</div>

			{/* Modal Popup */}
			{isOpen && (
				<div className='fixed inset-0 flex justify-center items-center z-50'>
					<div
						className='absolute inset-0 bg-gray-600 bg-opacity-50'
						// onClick={toggleModal} // Close modal when clicking outside the form
					></div>
					<div className='relative bg-white p-6 rounded-xl shadow-md max-w-md mx-auto z-10 space-y-4'>
						<h2 className='text-xl font-semibold text-gray-700'>
							Forgot Password
						</h2>
						<form onSubmit={handleSubmit}>
							<div className='mb-4'>
								<label
									htmlFor='email'
									className='block text-sm font-medium text-gray-700'
								>
									Email
								</label>
								<input
									type='email'
									id='email'
									value={email}
									onChange={handleInputChange}
									className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									required
									placeholder='Enter your email'
								/>
							</div>

							<button
								type='submit'
								disabled={loading}
								className={`w-full text-white py-2 px-4 rounded-md ${
									loading
										? "bg-gray-400 cursor-not-allowed"
										: "bg-zinc-700 hover:bg-zinc-600"
								}`}
							>
								{loading ? "Sending..." : "Send Reset Password"}
							</button>
						</form>

						{/* Success or Error Messages */}
						{message && (
							<p className='mt-4 text-green-600 text-sm'>{message}</p>
						)}
						{error && <p className='mt-4 text-red-600 text-sm'>{error}</p>}

						{/* Close button */}
						<div className='flex justify-end mt-4'>
							<button
								onClick={toggleModal}
								className='text-sm text-gray-500 hover:underline'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ForgotPassword;
