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
			toast.error(error, { toastId: "uniqueError" });
			prevError.current = error;
			dispatch(clearError());
		}

		if (message && message !== prevMessage.current) {
			toast.success(message, { toastId: "uniqueSuccess" });
			prevMessage.current = message;
			dispatch(clearMessage());
		}

		const timer = setTimeout(() => {
			prevMessage.current = null;
			prevError.current = null;
		}, 4000);

		return () => clearTimeout(timer);
	}, [dispatch, clearMessage, clearError, error, message]);
};
