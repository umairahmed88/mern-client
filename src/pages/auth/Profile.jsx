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
	clearError,
	clearMessage,
	signout,
	updateUser,
} from "../../redux/auth/authSlices";
import { useClearState } from "../../utils/useClearState";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/Modal";

const Profile = () => {
	const { currentUser, loading, message, error } = useSelector(
		(state) => state.auth
	);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fileRef = useRef();
	const [formData, setFormData] = useState({});
	const [file, setFile] = useState(null);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [filePerc, setFilePerc] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useClearState(dispatch, clearMessage, clearError, error, message);

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

	if (loading) return <p>Loading...</p>;

	return (
		<div className='max-w-2xl mx-auto'>
			<h1 className=' text-2xl font-bold m-3 text-center'>Profile</h1>
			<div className=' flex flex-col gap-3'>
				<div className=' flex justify-center '>
					<img
						src={avatar}
						className='h-24 w-24 rounded-full'
						alt='profile picture'
					/>
				</div>
				<p>
					username: <span className='font-bold'>{username}</span>
				</p>
				<p>
					email: <span className='font-bold'>{email}</span>
				</p>
			</div>
			<hr className='mt-3' />
			{currentUser && (
				<div className=' my-5'>
					<h1 className=' my-3 font-bold text-xl text-center'>
						Update Profile
					</h1>
					<form className=' flex flex-col gap-3' onSubmit={handleSubmit}>
						<div className=' flex justify-center '>
							<input
								type='file'
								accept='image/*'
								ref={fileRef}
								onChange={(e) => setFile(e.target.files[0])}
								hidden
							/>
							<img
								src={formData.avatar || avatar}
								className='h-24 w-24 rounded-full cursor-pointer'
								alt='profile picture'
								onClick={() => fileRef.current.click()}
							/>
						</div>
						<input
							type='text'
							id='username'
							defaultValue={formData.username || username}
							className=' border-2 rounded-lg p-3'
							onChange={handleChange}
						/>
						<input
							type='email'
							id='email'
							defaultValue={formData.email || email}
							className=' border-2 rounded-lg p-3'
							onChange={handleChange}
						/>
						<input
							type='password'
							id='password'
							placeholder='Password'
							className=' border-2 rounded-lg p-3'
							onChange={handleChange}
						/>
						<button className=' bg-zinc-600 p-3 rounded-lg hover:opacity-90 disabled:opacity-80'>
							{loading ? "Updating..." : "Update"}
						</button>
					</form>
				</div>
			)}
			<div className=' flex justify-end'>
				<button
					onClick={toggleModal}
					className=' bg-red-700 p-3 text-white rounded-lg hover:opacity-90 disabled:opacity-80'
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
