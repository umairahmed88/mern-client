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
		// Display error toast if there is a new error
		if (error && error !== prevError.current) {
			toast.error(error);
			prevError.current = error;
			dispatch(clearError()); // Clear error state immediately
		}

		// Display success toast if there is a new message
		if (message && message !== prevMessage.current) {
			toast.success(message);
			prevMessage.current = message;
			dispatch(clearMessage()); // Clear message state immediately
		}

		// Cleanup to reset refs after 4 seconds
		const timer = setTimeout(() => {
			prevMessage.current = null;
			prevError.current = null;
		}, 4000);

		return () => clearTimeout(timer); // Clear the timeout on unmount to avoid memory leaks
	}, [dispatch, clearMessage, clearError, error, message]); // Ensure dependencies are properly tracked
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
