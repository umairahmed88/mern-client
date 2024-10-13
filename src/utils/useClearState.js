import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useClearState = (dispatch, slices = []) => {
	const prevState = useRef({});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!Array.isArray(slices)) return;

		let loading = false;

		slices.forEach(({ name, error, message, clearError, clearMessage }) => {
			if (error || message) {
				loading = true; // Flag that something is loading
			}

			// Handle errors
			if (error && error !== prevState.current[`${name}Error`]) {
				toast.error(error, { toastId: `${name}Error` });
				dispatch(clearError());
				prevState.current[`${name}Error`] = error;
			}

			// Handle messages
			if (message && message !== prevState.current[`${name}Message`]) {
				toast.success(message, { toastId: `${name}Message` });
				dispatch(clearMessage());
				prevState.current[`${name}Message`] = message;
			}
		});

		// Only update loading state if it actually changed
		if (isLoading !== loading) {
			setIsLoading(loading); // Update state only if it's different
		}

		// Clean up previous state
		const timer = setTimeout(() => {
			prevState.current = {};
		}, 4000);

		return () => clearTimeout(timer);
	}, [dispatch, slices, isLoading]); // Correct dependencies

	return isLoading; // Return the current loading state
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

// // import { useEffect, useRef } from "react";
// // import { toast } from "react-toastify";

// // export const useClearState = (
// // 	dispatch,
// // 	clearMessage,
// // 	clearError,
// // 	error,
// // 	message
// // ) => {
// // 	const prevMessage = useRef(null);
// // 	const prevError = useRef(null);

// // 	useEffect(() => {
// // 		if (error && error !== prevError.current) {
// // 			toast.error(error, { toastId: "uniqueError" });
// // 			prevError.current = error;
// // 			dispatch(clearError());
// // 		}

// // 		if (message && message !== prevMessage.current) {
// // 			toast.success(message, { toastId: "uniqueSuccess" });
// // 			prevMessage.current = message;
// // 			dispatch(clearMessage());
// // 		}

// // 		const timer = setTimeout(() => {
// // 			prevMessage.current = null;
// // 			prevError.current = null;
// // 		}, 4000);

// // 		return () => clearTimeout(timer);
// // 	}, [dispatch, clearMessage, clearError, error, message]);
// // };
