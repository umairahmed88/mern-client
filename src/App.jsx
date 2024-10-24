import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoutes";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import Profile from "./pages/auth/Profile";
import VerifyEmail from "./components/VerifyEmail";
import AllProducts from "./pages/products/AllProducts";
import CreateProduct from "./pages/products/CreateProduct";
import ProductDetails from "./pages/products/ProductDetails";
import UpdateProduct from "./pages/products/UpdateProduct";
import ResetPassword from "./pages/auth/ResetPassword";
import CartItems from "./pages/cartItems/CartItems";
import CheckoutForm from "./pages/checkout/CheckoutForm";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import GlobalLoadingBar from "./utils/GlobalLoadingBar";
import { ToastContainer } from "react-toastify";
import { useClearState } from "./utils/useClearState";
import "react-toastify/dist/ReactToastify.css";
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";

const AppContent = () => {
	useClearState();

	return (
		<>
			<GlobalLoadingBar />
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signup' element={<Signup />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='/verify-email' element={<VerifyEmail />} />
				<Route path='/reset-password' element={<ResetPassword />} />
				<Route path='/cart-items' element={<CartItems />} />
				<Route path='/checkout-form' element={<CheckoutForm />} />
				<Route path='/checkout-success' element={<CheckoutSuccess />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/order-details/:id' element={<OrderDetails />} />
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

// import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
// import GlobalLoadingBar from "./utils/GlobalLoadingBar";
// import CheckoutForm from "./pages/checkout/CheckoutForm";

// const routes = [
// 	{ path: "/", element: <Home /> },
// 	{ path: "/signup", element: <Signup /> },
// 	{ path: "/signin", element: <Signin /> },
// 	{ path: "/verify-email", element: <VerifyEmail /> },
// 	{ path: "/reset-password", element: <ResetPassword /> },
// 	{ path: "/cart-items", element: <CartItems /> },
// 	{ path: "/checkout-form", element: <CheckoutForm /> },
// 	// { path: "/", element: <Home /> },
// ];

// const AppContent = () => {
// 	return (
// 		<>
// 			<GlobalLoadingBar />
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
// 		</>
// 	);
// };

// const App = () => {
// 	return (
// 		<Router>
// 			<AppContent />
// 		</Router>
// 	);
// };

// export default App;
