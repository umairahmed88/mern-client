import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Header,
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
import { UserRoute, AdminRoute } from "./components/PrivateRoutes";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	{ path: "/verify-email", element: <VerifyEmail /> },
	{ path: "/reset-password", element: <ResetPassword /> },
	{ path: "/cart-items", element: <CartItems />, user: true },
	{ path: "/checkout-form", element: <CheckoutForm />, user: true },
	{ path: "/checkout-success", element: <CheckoutSuccess />, user: true },
	{ path: "/orders", element: <Orders />, admin: true },
	{ path: "/order-details/:id", element: <OrderDetails />, admin: true },
	{ path: "/update-order/:id", element: <UpdateOrder />, admin: true },
	{ path: "/profile", element: <Profile />, user: true },
	{ path: "/products", element: <AllProducts />, admin: true },
	{ path: "/create-product", element: <CreateProduct />, admin: true },
	{ path: "/product-details/:id", element: <ProductDetails /> },
	{ path: "/update-product/:id", element: <UpdateProduct />, admin: true },
];

const AppContent = () => {
	useClearState();

	return (
		<>
			<GlobalLoadingBar />
			<Header />
			<Routes>
				{routes.map(({ path, element, user, admin }) =>
					admin ? (
						<Route element={<AdminRoute />} key={path}>
							<Route path={path} element={element} />
						</Route>
					) : user ? (
						<Route element={<UserRoute />} key={path}>
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
