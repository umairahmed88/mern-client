import { useEffect } from "react";
import { toast } from "react-toastify"; // Ensure toast is imported

export const useClearState = (
	dispatch,
	clearMessage,
	clearError,
	error,
	message
) => {
	useEffect(() => {
		// Display error and success messages
		if (error) {
			toast.error(error); // Display error toast
		}
		if (message) {
			toast.success(message); // Display success toast
		}

		// Set a timer to clear the messages after 4 seconds
		const timer = setTimeout(() => {
			dispatch(clearMessage());
			dispatch(clearError());
		}, 4000);

		return () => clearTimeout(timer); // Cleanup timeout on unmount
	}, [dispatch, clearMessage, clearError, error, message]);
};
