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
import Orders from "./pages/orders/Orders";
import OrderDetails from "./pages/orders/OrderDetails";
import UpdateOrder from "./pages/orders/UpdateOrder";
import GlobalLoadingBar from "./utils/GlobalLoadingBar";
import { ToastContainer } from "react-toastify";
import { useClearState } from "./utils/useClearState";
import "react-toastify/dist/ReactToastify.css";

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
				<Route element={<PrivateRoute />}>
					<Route path='/cart-items' element={<CartItems />} />
					<Route path='/checkout-form' element={<CheckoutForm />} />
					<Route path='/checkout-success' element={<CheckoutSuccess />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/order-details/:id' element={<OrderDetails />} />
					<Route path='/update-order/:id' element={<UpdateOrder />} />
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
