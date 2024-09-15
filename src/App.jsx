import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/auth/Profile";
import PrivateRoute from "./components/PrivateRoutes";

const routes = [
	{ path: "/", element: <Home /> },
	{ path: "/signup", element: <Signup /> },
	{ path: "/signin", element: <Signin /> },
	// { path: "/profile", element: <Profile /> },
	// { path: "/", element: <Home /> },
];

const App = () => {
	return (
		<Router>
			<Header />
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} key={route.path} element={route.element} />
				))}
				<Route element={<PrivateRoute />}>
					<Route path='/profile' element={<Profile />} />
				</Route>
			</Routes>
			<ToastContainer />
		</Router>
	);
};

export default App;
