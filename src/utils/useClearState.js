import { useEffect } from "react";

export const useClearState = (dispatch, clearMessage, clearError) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			dispatch(clearMessage()), dispatch(clearError());
		}, 4000);

		return () => clearTimeout(timer);
	}, [dispatch, clearMessage, clearError]);
};
