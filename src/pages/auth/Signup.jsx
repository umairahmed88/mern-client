import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError as clearAuthError,
	clearMessage as clearAuthMessage,
	signup,
} from "../../redux/auth/authSlices";
import { useClearState } from "../../utils/useClearState";
import { Link } from "react-router-dom";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GoogleAuth from "../../components/GoogleAuth";
import ForgotPassword from "../../components/ForgotPassword";

const Signup = () => {
	const {
		loading,
		message: authMessage,
		error: authError,
	} = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);
	const [visible, setVisible] = useState(false);

	useClearState(dispatch, [
		{
			name: "auth",
			error: authError,
			message: authMessage,
			clearError: clearAuthError,
			clearMessage: clearAuthMessage,
		},
	]);

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	const handleUploadFile = (file) => {
		setUploading(true);
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setFilePerc(Math.round(progress));
			},
			(error) => {
				setFileUploadError(true);
				setUploading(false);
				toast.error("Error uploading image.");
			},
			async () => {
				const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
				setFormData((prevData) => ({ ...prevData, avatar: downloadUrl }));

				setUploading(false);
				toast.success("Image uploaded.");
			}
		);
	};

	const handleRemoveImage = () => {
		setFormData({
			...formData,
			avatar: "",
		});

		setFile(null);
		setFilePerc(0);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await dispatch(signup(formData)).unwrap();

			if (res) {
				setFormData("");
			}
		} catch (err) {
			console.error("Error during signup:", err);
		}
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg'>
			<h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>
				Signup
			</h1>

			<div>
				<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
					<input
						type='text'
						id='username'
						placeholder='Username'
						className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
						onChange={handleChange}
						required
					/>
					<input
						type='email'
						id='email'
						placeholder='Email'
						className='p-4 border-2 rounded-lg w-full text-gray-700 focus:outline-none focus:border-indigo-500'
						onChange={handleChange}
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

					<div className='flex items-center border-2 rounded-lg p-4'>
						<input
							type={visible ? "text" : "password"}
							placeholder='Confirm Password'
							className='w-full border-none outline-none text-gray-700'
							id='confirmPassword'
							onChange={handleChange}
							required
						/>
					</div>

					<div className='border-2 rounded-lg p-4 flex flex-col items-center'>
						<p className='text-center text-gray-700 mb-2'>
							Select a profile image
						</p>
						<input
							type='file'
							onChange={(e) => setFile(e.target.files[0])}
							accept='image/*'
							className='mb-3'
							required
						/>
						<p className='text-sm text-gray-600'>
							{fileUploadError ? (
								<span className='text-red-600'>
									Error uploading image (must be less than 2MB)
								</span>
							) : filePerc > 0 && filePerc < 100 ? (
								<span>Uploading {filePerc}%</span>
							) : filePerc === 100 ? (
								<span className='text-green-600'>
									Image successfully uploaded!
								</span>
							) : (
								""
							)}
						</p>
						{file && (
							<div className='flex items-center gap-4'>
								<img
									src={formData.avatar}
									alt='Profile'
									className='h-24 w-24 rounded-full object-cover'
								/>
								<button
									type='button'
									onClick={handleRemoveImage}
									className='text-red-600 font-semibold hover:underline'
								>
									Delete
								</button>
							</div>
						)}
					</div>

					<button
						disabled={uploading || loading || (file && filePerc < 100)}
						className='w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-opacity disabled:opacity-75'
					>
						{loading ? "Signing up..." : "SignUp"}
					</button>

					<GoogleAuth />
				</form>

				{authError && (
					<p className='text-red-600 mt-3 text-center'>{authError}</p>
				)}
				{authMessage && (
					<p className='text-green-600 mt-3 text-center'>{authMessage}</p>
				)}

				<ForgotPassword />
			</div>

			<div className='flex justify-center mt-6 gap-2'>
				<p className='text-gray-700'>Already have an account?</p>
				<Link className='text-indigo-600 hover:underline' to='/signin'>
					Signin
				</Link>
			</div>
		</div>
	);
};

export default Signup;
