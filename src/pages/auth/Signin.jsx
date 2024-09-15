import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClearState } from "../../utils/useClearState";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, signin } from "../../redux/auth/authSlices";
import { toast } from "react-toastify";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GoogleAuth from "../../components/GoogleAuth";

const Signin = () => {
	const { loading, error, message } = useSelector((state) => state.auth);
	const [formData, setFormData] = useState({});
	const [visible, setVisible] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useClearState(dispatch, clearMessage, clearError);

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
				toast.success(message);
				navigate("/profile");
			}
		} catch (err) {
			toast.error(err);
			toast.error(error);
		}
	};

	if (loading) return <div className=''>Loading...</div>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Sign In</h1>
			<div className=''>
				<form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
					<input
						type='email'
						placeholder='Email'
						className=' p-3 rounded-lg border-2'
						id='email'
						onChange={handleChange}
					/>
					<div className=' p-3 rounded-lg border-2 flex justify-between'>
						<input
							type={visible ? "text" : "password"}
							placeholder='Password'
							className='border-none outline-none w-[95%]'
							id='password'
							onChange={handleChange}
						/>
						<div
							onClick={(e) => setVisible(!visible)}
							className=' cursor-pointer'
						>
							{visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
						</div>
					</div>
					<button className=' up p-3 bg-zinc-600 rounded-lg hover:opacity-90'>
						Signin
					</button>
					<GoogleAuth />
				</form>
			</div>
			<div className=' flex gap-2 p-2'>
				<p>Do not have account? </p>
				<Link className=' text-blue-700 hover:underline' to={"/signup"}>
					Signup
				</Link>
				first
			</div>
		</div>
	);
};

export default Signin;
