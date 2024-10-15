import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { signout } from "../redux/auth/authSlices";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function PrivateRoute() {
	const { currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [isTokenValid, setIsTokenValid] = useState(true); // State to manage token validity

	useEffect(() => {
		if (currentUser && currentUser?.sanitizedUser?.token) {
			try {
				const decodedToken = jwtDecode(currentUser?.sanitizedUser?.token);

				if (decodedToken.exp * 1000 < Date.now()) {
					setIsTokenValid(false);
					dispatch(signout());
				}
			} catch (err) {
				setIsTokenValid(false);
				dispatch(signout());
			}
		}
	}, [currentUser, dispatch]);

	if (!currentUser || !isTokenValid) {
		return <Navigate to='/signin' />;
	}

	return <Outlet />;
}

// import { useDispatch, useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";
// import { signout } from "../redux/auth/authSlices";
// import { jwtDecode } from "jwt-decode";

// export default function PrivateRoute() {
// 	const { currentUser } = useSelector((state) => state.auth);
// 	const dispatch = useDispatch();

// 	if (currentUser && currentUser?.sanitizedUser?.token) {
// 		try {
// 			const decodedToken = jwtDecode(currentUser?.sanitizedUser?.token);

// 			if (decodedToken.exp * 1000 < Date.now()) {
// 				dispatch(signout());
// 				return <Navigate to='/signin' />;
// 			}
// 		} catch (err) {
// 			dispatch(signout());
// 			return <Navigate to='/signin' />;
// 		}
// 	}
// 	return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
// }
