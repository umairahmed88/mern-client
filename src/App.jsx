// import {
// 	Route,
// 	BrowserRouter as Router,
// 	Routes,
// 	useLocation,
// } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import Signup from "./pages/auth/Signup";
// import Signin from "./pages/auth/Signin";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";
// import Profile from "./pages/auth/Profile";
// import PrivateRoute from "./components/PrivateRoutes";
// import VerifyEmail from "./components/VerifyEmail";
// import AllProducts from "./pages/products/AllProducts";
// import ProductDetails from "./pages/products/ProductDetails";
// import UpdateProduct from "./pages/products/UpdateProduct";
// import CreateProduct from "./pages/products/CreateProduct";
// import ResetPassword from "./pages/auth/ResetPassword";
// import CartItems from "./pages/cartItems/CartItems";
// import TopLoadingBar from "react-top-loading-bar";
// import { useEffect, useState } from "react";

// const routes = [
// 	{ path: "/", element: <Home /> },
// 	{ path: "/signup", element: <Signup /> },
// 	{ path: "/signin", element: <Signin /> },
// 	{ path: "/verify-email", element: <VerifyEmail /> },
// 	// { path: "/products", element: <AllProducts /> },
// 	// { path: "/create-product", element: <CreateProduct /> },
// 	// { path: "/product-details/:id", element: <ProductDetails /> },
// 	// { path: "/update-product/:id", element: <UpdateProduct /> },
// 	{ path: "/reset-password", element: <ResetPassword /> },
// 	{ path: "/cart-items", element: <CartItems /> },

// 	// { path: "/profile", element: <Profile /> },
// 	// { path: "/", element: <Home /> },
// ];

// const App = () => {
// 	const [progress, setProgress] = useState(0); // State to track loading progress
// 	const location = useLocation(); // useLocation for route changes

// 	// Trigger progress on route change
// 	useEffect(() => {
// 		setProgress(30); // Start the loading progress when route changes
// 		setTimeout(() => {
// 			setProgress(100); // Complete the progress after a short delay
// 		}, 800);
// 	}, [location]);

// 	return (
// 		<Router>
// 			<TopLoadingBar
// 				color='#f11946'
// 				progress={progress}
// 				onLoaderFinished={() => setProgress(0)}
// 			/>
// 			<Header />
// 			<Routes>
// 				{routes.map((route) => (
// 					<Route path={route.path} key={route.path} element={route.element} />
// 				))}
// 				<Route element={<PrivateRoute />}>
// 					<Route path='/profile' element={<Profile />} />
// 					<Route path='/products' element={<AllProducts />} />
// 					<Route path='/create-product' element={<CreateProduct />} />
// 					<Route path='/product-details/:id' element={<ProductDetails />} />
// 					<Route path='/update-product/:id' element={<UpdateProduct />} />
// 				</Route>
// 			</Routes>
// 			<ToastContainer />
// 		</Router>
// 	);
// };

// export default App;

import {
	Route,
	BrowserRouter as Router,
	Routes,
	useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/auth/Profile";
import PrivateRoute from "./components/PrivateRoutes";
import VerifyEmail from "./components/VerifyEmail";
import AllProducts from "./pages/products/AllProducts";
import ProductDetails from "./pages/products/ProductDetails";
import UpdateProduct from "./pages/products/UpdateProduct";
import CreateProduct from "./pages/products/CreateProduct";
import ResetPassword from "./pages/auth/ResetPassword";
import CartItems from "./pages/cartItems/CartItems";
import { useState, useEffect } from "react";
import GlobalLoadingBar from "./utils/GlobalLoadingBar";
import { useDispatch, useSelector } from "react-redux";
import { useClearState } from "./utils/useClearState";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/cart-items", element: <CartItems /> },
];

const AppContent = () => {
	const [isRouteLoading, setIsRouteLoading] = useState(false); // For route changes
	const location = useLocation();
	const dispatch = useDispatch();

	// Get slices for global error/message handling
	const errorSlices = useSelector((state) => [
		{
			name: "auth",
			error: state.auth.error,
			message: state.auth.message,
			clearError: state.auth.clearError,
			clearMessage: state.auth.clearMessage,
		},
	]);

	// Get global loading state from the hook
	const isGlobalLoading = useClearState(dispatch, errorSlices);

	// Manage route-based loading
	useEffect(() => {
		let timeout;
		setIsRouteLoading(true); // Start loading when route changes

		// Delay to simulate loading (or set based on actual async operations)
		timeout = setTimeout(() => {
			setIsRouteLoading(false); // Stop loading after delay
		}, 800);

		// Clean up timeout to avoid memory leaks
		return () => clearTimeout(timeout);
	}, [location]);

	return (
		<>
			<GlobalLoadingBar isLoading={isRouteLoading || isGlobalLoading} />{" "}
			{/* Show loading bar */}
			<Header />
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} key={route.path} element={route.element} />
				))}
				<Route element={<PrivateRoute />}>
					<Route path='/profile' element={<Profile />} />
					<Route path='/products' element={<AllProducts />} />
					<Route path='/create-product' element={<CreateProduct />} />
					<Route path='/product-details/:id' element={<ProductDetails />} />
					<Route path='/update-product/:id' element={<UpdateProduct />} />
				</Route>
			</Routes>
			<ToastContainer />
		</>
	);
};

const App = () => {
	return (
		<Router>
			<AppContent />
		</Router>
	);
};

export default App;
