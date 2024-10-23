import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { toast } from "react-toastify";
import {
	signout,
	updateUser,
} from "../../redux/auth/authSlices";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/Modal";

const Profile = () => {
	const {
		currentUser,
		loading,
		message: authMessage,
		error: authError,
	} = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef();
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [showUpdateForm, setShowUpdateForm] = useState(false);


	const { avatar, username, email, id } = currentUser?.sanitizedUser || {};

	useEffect(() => {
		if (file) {
			handleUploadFile(file);
		}
	}, [file]);

	const handleUploadFile = (file) => {
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
				if (progress > 0 && progress < 100) {
					toast.info(`Uploading ${Math.round(progress)}%`);
				}
			},
			(error) => {
				setFileUploadError(error);
				toast.error("Error during image upload. (Image must be less than 2MB)");
			},
			async () => {
				const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
				dispatch(
					updateUser({
						id,
						userData: { avatar: downloadURL },
					})
				);
				toast.success("Profile Image Updated!");
			}
		);
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
			const isEmailUpdated = formData.email && formData.email !== email;

			const res = await dispatch(
				updateUser({
					id,
					userData: formData,
				})
			).unwrap();

			if (res) {
				if (isEmailUpdated) {
					await dispatch(signout()).unwrap();
					navigate("/signin");
				}
			}
		} catch (err) {}
	};

	const handleSignout = async () => {
		try {
			const res = await dispatch(signout()).unwrap();

			if (res) {
				navigate("/signin");
			}
		} catch (err) {}
	};

	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	const toggleUpdateForm = () => {
		setShowUpdateForm((prev) => !prev); // Toggles the update form
	};

	if (loading)
		return <div className='text-center text-xl py-10'>Loading...</div>;

	return (
		<div className='max-w-3xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-6 text-center'>Profile</h1>

			{!showUpdateForm ? (
				// Display Profile Information
				<>
					<div className='flex flex-col items-center gap-4'>
						<div className='flex justify-center'>
							<img
								src={avatar}
								className='h-28 w-28 rounded-full object-cover border-2 shadow-lg'
								alt='profile picture'
							/>
						</div>
						<p className='text-lg'>
							Username:{" "}
							<span className='font-semibold text-gray-700'>{username}</span>
						</p>
						<p className='text-lg'>
							Email:{" "}
							<span className='font-semibold text-gray-700'>{email}</span>
						</p>
					</div>
					<hr className='my-6 border-gray-300' />
					<button
						className='bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 transition-all'
						onClick={toggleUpdateForm}
					>
						Update Profile
					</button>
				</>
			) : (
				// Display Update Form when toggled
				<div className='my-8'>
					<h2 className='text-2xl font-semibold mb-4 text-center'>
						Update Profile
					</h2>
					<form className='flex flex-col gap-6' onSubmit={handleSubmit}>
						<div className='flex justify-center'>
							<input
								type='file'
								accept='image/*'
								ref={fileRef}
								onChange={(e) => setFile(e.target.files[0])}
								hidden
							/>
							<img
								src={formData.avatar || avatar}
								className='h-28 w-28 rounded-full object-cover border-2 border-gray-300 shadow-lg cursor-pointer'
								alt='profile update picture'
								onClick={() => fileRef.current.click()}
							/>
						</div>
						<input
							type='text'
							id='username'
							defaultValue={formData.username || username}
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							placeholder='Update Username'
							onChange={handleChange}
						/>
						<input
							type='email'
							id='email'
							defaultValue={formData.email || email}
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							placeholder='Update Email'
							onChange={handleChange}
						/>
						<input
							type='password'
							id='password'
							placeholder='Update Password'
							className='border-2 border-gray-300 rounded-lg p-3 w-full text-gray-700 focus:border-indigo-500 focus:outline-none'
							onChange={handleChange}
						/>
						<div className='flex justify-between'>
							<button
								className='bg-indigo-700 text-white py-3 px-6 rounded-lg hover:bg-indigo-500 transition-all disabled:opacity-80'
								disabled={loading}
							>
								{loading ? "Updating..." : "Update"}
							</button>
							<button
								type='button'
								className='bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition-all'
								onClick={toggleUpdateForm}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			<div className='flex justify-end'>
				<button
					onClick={toggleModal}
					className='bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-500 transition-all disabled:opacity-80'
				>
					Signout
				</button>
				<ConfirmationModal
					isOpen={isModalOpen}
					title='Confirm Signout'
					message='Are you sure you want to signout?'
					onClose={toggleModal}
					onConfirm={() => {
						toggleModal();
						handleSignout();
					}}
				/>
			</div>
		</div>
	);
};

export default Profile;
