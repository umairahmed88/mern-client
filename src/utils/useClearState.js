import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

// Centralized clear state hook with unique toastId
export const useClearState = (
	dispatch,
	clearMessage,
	clearError,
	error,
	message
) => {
	const prevMessage = useRef(null);
	const prevError = useRef(null);

	useEffect(() => {
		// Handle error toast
		if (error && error !== prevError.current) {
			toast.error(error, { toastId: "uniqueError" }); // Assigning unique toastId for errors
			prevError.current = error;
			dispatch(clearError()); // Clear error after displaying toast
		}

		// Handle success message toast
		if (message && message !== prevMessage.current) {
			toast.success(message, { toastId: "uniqueSuccess" }); // Assigning unique toastId for success messages
			prevMessage.current = message;
			dispatch(clearMessage()); // Clear message after displaying toast
		}

		// Clear previous values after 4 seconds
		const timer = setTimeout(() => {
			prevMessage.current = null;
			prevError.current = null;
		}, 4000);

		// Clean up timeout
		return () => clearTimeout(timer);
	}, [dispatch, clearMessage, clearError, error, message]);
};

// import { useEffect, useRef } from "react";
// import { toast } from "react-toastify";

// export const useClearState = (
// 	dispatch,
// 	clearMessage,
// 	clearError,
// 	error,
// 	message
// ) => {
// 	const prevMessage = useRef(null);
// 	const prevError = useRef(null);

// 	useEffect(() => {
// 		if (error && error !== prevError.current) {
// 			toast.error(error);
// 			prevError.current = error;
// 			dispatch(clearError());
// 		}

// 		if (message && message !== prevMessage.current) {
// 			toast.success(message);
// 			prevMessage.current = message;
// 			dispatch(clearMessage());
// 		}

// 		const timer = setTimeout(() => {
// 			prevMessage.current = null;
// 			prevError.current = null;
// 		}, 4000);

// 		return () => clearTimeout(timer);
// 	}, [dispatch, clearMessage, clearError, error, message]);
// };
