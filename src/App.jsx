import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Header,
	PrivateRoute,
	Home,
	Signup,
	Signin,
	VerifyEmail,
	ResetPassword,
	Profile,
	AllProducts,
	CreateProduct,
	ProductDetails,
	UpdateProduct,
	CartItems,
	CheckoutForm,
	CheckoutSuccess,
	Orders,
	OrderDetails,
	UpdateOrder,
	GlobalLoadingBar,
	useClearState,
	ToastContainer,
} from "./index";
import "react-toastify/dist/ReactToastify.css";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/cart-items", element: <CartItems />, private: true },
	{ path: "/checkout-form", element: <CheckoutForm />, private: true },
	{ path: "/checkout-success", element: <CheckoutSuccess />, private: true },
	{ path: "/orders", element: <Orders />, private: true },
	{ path: "/order-details/:id", element: <OrderDetails />, private: true },
	{ path: "/update-order/:id", element: <UpdateOrder />, private: true },
	{ path: "/profile", element: <Profile />, private: true },
	{ path: "/products", element: <AllProducts />, private: true },
	{ path: "/create-product", element: <CreateProduct />, private: true },
	{ path: "/product-details/:id", element: <ProductDetails />, private: true },
	{ path: "/update-product/:id", element: <UpdateProduct />, private: true },
];

const AppContent = () => {
	useClearState();

	return (
		<>
			<GlobalLoadingBar />
			<Header />
			<Routes>
				{routes.map(({ path, element, private: isPrivate }) =>
					isPrivate ? (
						<Route element={<PrivateRoute />} key={path}>
							<Route path={path} element={element} />
						</Route>
					) : (
						<Route path={path} element={element} key={path} />
					)
				)}
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
