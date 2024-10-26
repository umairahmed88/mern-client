// src/index.js
export { default as Header } from "./components/Header";
export { default as PrivateRoute } from "./components/PrivateRoutes";
export { default as VerifyEmail } from "./components/VerifyEmail";
export { default as GlobalLoadingBar } from "./utils/GlobalLoadingBar";
export { useClearState } from "./utils/useClearState";

// Auth Pages
export { default as Signup } from "./pages/auth/Signup";
export { default as Signin } from "./pages/auth/Signin";
export { default as Profile } from "./pages/auth/Profile";
export { default as ResetPassword } from "./pages/auth/ResetPassword";

// Product Pages
export { default as AllProducts } from "./pages/products/AllProducts";
export { default as CreateProduct } from "./pages/products/CreateProduct";
export { default as ProductDetails } from "./pages/products/ProductDetails";
export { default as UpdateProduct } from "./pages/products/UpdateProduct";

// Cart and Checkout Pages
export { default as CartItems } from "./pages/cartItems/CartItems";
export { default as CheckoutForm } from "./pages/checkout/CheckoutForm";
export { default as CheckoutSuccess } from "./pages/checkout/CheckoutSuccess";

// Order Pages
export { default as Orders } from "./pages/orders/Orders";
export { default as OrderDetails } from "./pages/orders/OrderDetails";
export { default as UpdateOrder } from "./pages/orders/UpdateOrder";

// Other Pages
export { default as Home } from "./pages/Home";

// External Libraries
export { ToastContainer } from "react-toastify";
