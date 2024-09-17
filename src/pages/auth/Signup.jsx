import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearMessage, signup } from "../../redux/auth/authSlices";
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

const Signup = () => {
	const { loading, message, error } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		avatar: "",
	});
	const [file, setFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	useClearState(dispatch, clearMessage, clearError);

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
				await getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
					setFormData({ ...formData, avatar: downloadUrl });
					setUploading(false);
					toast.success("Image uploaded.");
				});
			}
		);
	};

	const handleRemoveImage = () => {
		setFormData({
			...formData,
			avatar: "",
		});
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (file && filePerc < 100) {
			toast.error("Please wait for the image to finish uploading.");
			return;
		}

		try {
			const res = await dispatch(signup(formData)).unwrap();
			if (res) {
				toast.success("Signup successful");
				setFormData({
					username: "",
					email: "",
					password: "",
					confirmPassword: "",
					avatar: "",
				});
			}
		} catch (err) {
			toast.error(err);
		}
	};

	useEffect(() => {
		if (message) {
			toast.success(message);
			setFormData({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
				avatar: "",
			});
		}

		if (error) {
			toast.error(error);
		}

		return () => {
			dispatch(clearMessage());
			dispatch(clearError());
		};
	}, [message, error, dispatch]);

	if (loading) return <p>Loading...</p>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Signup</h1>
			<div className=''>
				<form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
					<input
						type='text'
						id='username'
						placeholder='Username'
						className=' border-2 p-3 rounded-lg'
						onChange={handleChange}
						required
					/>
					<input
						type='email'
						id='email'
						placeholder='Email'
						className=' border-2 p-3 rounded-lg'
						onChange={handleChange}
						required
					/>
					<div className=' p-3 rounded-lg border-2 flex justify-between'>
						<input
							type={visible ? "text" : "password"}
							placeholder='Password'
							className='border-none outline-none  w-[95%]'
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
					<div className=' p-3 rounded-lg border-2 flex justify-between'>
						<input
							type={visible ? "text" : "password"}
							placeholder='Confirm Password'
							className='border-none outline-none  w-[95%]'
							id='confirmPassword'
							onChange={handleChange}
						/>
					</div>
					<div className='border-2 flex p-2 flex-col'>
						<p className='text-center'>Select a profile image</p>
						<div className=''>
							<input
								type='file'
								onChange={(e) => setFile(e.target.files[0])}
								accept='image/*'
								required
							/>
							<p>
								{fileUploadError ? (
									<span className=' text-red-700'>
										Error uploading image(image must be less than 2 mb)
									</span>
								) : filePerc > 0 && filePerc < 100 ? (
									<span>{`Uploading ${filePerc}%`}</span>
								) : filePerc === 100 ? (
									<span>Image successfully uploaded!</span>
								) : (
									""
								)}
							</p>
						</div>
						{file && (
							<div className=' flex justify-between'>
								<img
									src={formData.avatar}
									alt='profile image'
									className=' h-24 w-24 object-contain rounded-full'
								/>
								<button
									onClick={handleRemoveImage}
									className=' text-red-700 p-3 rounded-lg uppercase'
								>
									Delete
								</button>
							</div>
						)}
					</div>
					<button
						disabled={uploading || loading || (file && filePerc < 100)}
						className='rounded-lg bg-zinc-600 p-3 font-bold hover:opacity-90 disabled:opacity-80'
					>
						{loading ? "Signing up..." : "SignUp"}
					</button>
					<GoogleAuth />
					{error && <p className=' text-red-700'>{error}</p>}
					{message && <p className=' text-green-600 text-center'>{message}</p>}
				</form>
			</div>
			<div className=' flex gap-2'>
				<p>Already Signup ?</p>
				<Link className=' hover:underline text-blue-700' to={"/signin"}>
					Signin
				</Link>
				instead.
			</div>
		</div>
	);
};

export default Signup;
