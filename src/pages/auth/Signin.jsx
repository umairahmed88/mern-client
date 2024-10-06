import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClearState } from "../../utils/useClearState";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, signin } from "../../redux/auth/authSlices";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GoogleAuth from "../../components/GoogleAuth";
import ForgotPassword from "../../components/ForgotPassword";

const Signin = () => {
	const { loading, error, message } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({});
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useClearState(dispatch, clearMessage, clearError, error, message);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(signin(formData)).unwrap();
			if (res) {
				navigate("/profile");
			}
		} catch (err) {}
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-lg'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
				Sign In
			</h1>

			<div>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
						onChange={handleChange}
						id='email'
						required
					/>

					<div className='flex items-center border-2 rounded-lg p-4'>
						<input
							type={visible ? "text" : "password"}
							placeholder='Password'
							className='w-full border-none outline-none text-gray-700'
							id='password'
							onChange={handleChange}
							required
						/>
						<div
							onClick={() => setVisible(!visible)}
							className='cursor-pointer text-gray-600'
						>
							{visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
						</div>
					</div>

					<button
						disabled={loading}
						className='w-full p-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-opacity disabled:opacity-75'
					>
						{loading ? "Signing in..." : "Signin"}
					</button>

					<GoogleAuth />
				</form>

				{error && <p className='text-red-600 mt-3 text-center'>{error}</p>}
				{message && (
					<p className='text-green-600 mt-3 text-center'>{message}</p>
				)}

				<ForgotPassword />
			</div>

			<div className='flex justify-center mt-6 gap-2'>
				<p className='text-gray-700'>Don't have an account?</p>
				<Link className='text-indigo-600 hover:underline' to={"/signup"}>
					Signup
				</Link>
			</div>
		</div>
	);
};

export default Signin;
