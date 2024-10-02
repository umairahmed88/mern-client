import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { resetPassword } from "../../redux/auth/authSlices";

const ResetPassword = () => {
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Extract token from URL
	const query = new URLSearchParams(useLocation().search);
	const token = query.get("token");

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (newPassword !== confirmNewPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			setLoading(true);
			// Dispatch reset password action
			const res = await dispatch(
				resetPassword({ token, newPassword, confirmNewPassword })
			).unwrap();

			// Success response
			toast.success(res.message);
			navigate("/signin"); // Redirect to login page after successful reset
		} catch (err) {
			toast.error(err?.message || "Error resetting password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
				<h2 className='text-2xl font-semibold text-gray-700 text-center'>
					Reset Password
				</h2>

				<form onSubmit={handleSubmit} className='mt-6'>
					<div className='mb-4'>
						<label
							htmlFor='new-password'
							className='block text-sm font-medium text-gray-700'
						>
							New Password
						</label>
						<input
							type='password'
							id='new-password'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
							placeholder='Enter new password'
						/>
					</div>

					<div className='mb-6'>
						<label
							htmlFor='confirm-new-password'
							className='block text-sm font-medium text-gray-700'
						>
							Confirm New Password
						</label>
						<input
							type='password'
							id='confirm-new-password'
							value={confirmNewPassword}
							onChange={(e) => setConfirmNewPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
							required
							placeholder='Confirm new password'
						/>
					</div>

					<button
						type='submit'
						disabled={loading}
						className={`w-full py-2 px-4 rounded-md text-white ${
							loading
								? "bg-gray-400 cursor-not-allowed"
								: "bg-indigo-600 hover:bg-indigo-700"
						}`}
					>
						{loading ? "Resetting..." : "Reset Password"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default ResetPassword;
