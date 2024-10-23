import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
	clearError as clearProductError,
	clearMessage as clearProductMessage,
} from "../redux/products/productSlices";
import {
	clearError as clearCartError,
	clearMessage as clearCartMessage,
} from "../redux/cartItems/cartItemsSlices";
import {
	clearError as clearAuthError,
	clearMessage as clearAuthMessage,
} from "../redux/auth/authSlices";
import {
	clearError as clearOrderError,
	clearMessage as clearOrderMessage,
} from "../redux/orders/ordersSlices";

export const useClearState = () => {
	const dispatch = useDispatch();
	const prevState = useRef({});

	const { error: productError, message: productMessage } = useSelector(
		(state) => state.product
	);
	const { error: cartError, message: cartMessage } = useSelector(
		(state) => state.cartItem
	);
	const { error: authError, message: authMessage } = useSelector(
		(state) => state.auth
	);
	const { error: orderError, message: orderMessage } = useSelector(
		(state) => state.order
	);

	useEffect(() => {
		const slices = [
			{
				name: "product",
				error: productError,
				message: productMessage,
				clearError: () => dispatch(clearProductError()),
				clearMessage: () => dispatch(clearProductMessage()),
			},
			{
				name: "cartItem",
				error: cartError,
				message: cartMessage,
				clearError: () => dispatch(clearCartError()),
				clearMessage: () => dispatch(clearCartMessage()),
			},
			{
				name: "auth",
				error: authError,
				message: authMessage,
				clearError: () => dispatch(clearAuthError()),
				clearMessage: () => dispatch(clearAuthMessage()),
			},
			{
				name: "order",
				error: orderError,
				message: orderMessage,
				clearError: () => dispatch(clearOrderError()),
				clearMessage: () => dispatch(clearOrderMessage()),
			},
		];

		slices.forEach(({ name, error, message, clearError, clearMessage }) => {
			if (error && error !== prevState.current[`${name}Error`]) {
				toast.error(error, { toastId: `${name}Error` });
				clearError();
				prevState.current[`${name}Error`] = error;
			}

			if (message && message !== prevState.current[`${name}Message`]) {
				toast.success(message, { toastId: `${name}Message` });
				clearMessage();
				prevState.current[`${name}Message`] = message;
			}
		});

		const timer = setTimeout(() => {
			prevState.current = {};
		}, 4000);

		return () => clearTimeout(timer);
	}, [
		productError,
		productMessage,
		cartError,
		cartMessage,
		authError,
		authMessage,
		orderError,
		orderMessage,
		dispatch,
	]);
};

// import { useEffect, useRef } from "react";
// import { toast } from "react-toastify";

// export const useClearState = (dispatch, slices = []) => {
// 	const prevState = useRef({});

// 	useEffect(() => {
// 		if (!Array.isArray(slices)) return;

// 		slices.forEach(({ name, error, message, clearError, clearMessage }) => {
// 			if (error && error !== prevState.current[`${name}Error`]) {
// 				toast.error(error, { toastId: `${name}Error` });
// 				dispatch(clearError());
// 				prevState.current[`${name}Error`] = error;
// 			}

// 			if (message && message !== prevState.current[`${name}Message`]) {
// 				toast.success(message, { toastId: `${name}Message` });
// 				dispatch(clearMessage());
// 				prevState.current[`${name}Message`] = message;
// 			}
// 		});

// 		const timer = setTimeout(() => {
// 			prevState.current = {};
// 		}, 4000);

// 		return () => clearTimeout(timer);
// 	}, [dispatch, slices]);
// };
