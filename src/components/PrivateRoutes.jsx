import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { signout } from "../redux/auth/authSlices";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute() {
	const { currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	if (currentUser && currentUser?.sanitizedUser?.token) {
		try {
			const decodedToken = jwtDecode(currentUser?.sanitizedUser?.token);

			if (decodedToken.exp * 1000 < Date.now()) {
				dispatch(signout());
				return <Navigate to='/signin' />;
			}
		} catch (err) {
			dispatch(signout());
			return <Navigate to='/signin' />;
		}
	}
	return currentUser ? <Outlet /> : <Navigate to={"/signin"} />;
}
