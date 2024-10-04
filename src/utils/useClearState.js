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
		if (error && error !== prevError.current) {
			toast.error(error);
			prevError.current = error;
			dispatch(clearError());
		}
		if (message && message !== prevMessage.current) {
			toast.success(message);
			prevMessage.current = message;
			dispatch(clearMessage());
		}

		const timer = setTimeout(() => {
			prevMessage.current = null;
			prevError.current = null;
		}, 4000);

		return () => clearTimeout(timer); // Cleanup timeout on unmount
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
// 		}
// 		if (message && message !== prevMessage.current) {
// 			toast.success(message);
// 			prevMessage.current = message;
// 		}

// 		const timer = setTimeout(() => {
// 			dispatch(clearMessage());
// 			dispatch(clearError());
// 		}, 4000);

// 		return () => clearTimeout(timer);
// 	}, [dispatch, clearMessage, clearError, error, message]);
// };
