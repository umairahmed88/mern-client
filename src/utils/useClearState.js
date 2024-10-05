import { useEffect, useRef } from "react";
import { toast } from "react-toastify";

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
			toast.error(error); // Trigger toast only once for error
			prevError.current = error;
			dispatch(clearError());
		}

		// Handle success message toast
		if (message && message !== prevMessage.current) {
			toast.success(message); // Trigger toast only once for message
			prevMessage.current = message;
			dispatch(clearMessage());
		}

		// Clear previous error/message after 4 seconds
		const timer = setTimeout(() => {
			prevMessage.current = null;
			prevError.current = null;
		}, 4000);

		return () => clearTimeout(timer); // Clean up timer
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

// 		return () => clearTimeout(timer); // Cleanup timeout on unmount
// 	}, [dispatch, clearMessage, clearError, error, message]);
// };
