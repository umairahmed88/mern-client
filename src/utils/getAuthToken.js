export const getAuthToken = (getState, rejectWithValue) => {
	const { currentUser } = getState().auth;

	if (!currentUser) {
		return rejectWithValue({
			message: "Please login or signup first to add items to your cart.",
		});
	}

	return currentUser.sanitizedUser.token;
};
