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

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import GlobalLoadingBar from "./utils/GlobalLoadingBar";
import CheckoutForm from "./pages/checkout/CheckoutForm";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/cart-items", element: <CartItems /> },
	{ path: "/checkout-form", element: <CheckoutForm /> },
	// { path: "/", element: <Home /> },
];

const AppContent = () => {
	return (
		<>
			<GlobalLoadingBar />
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
