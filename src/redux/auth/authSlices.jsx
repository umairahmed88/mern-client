import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import storage from "redux-persist/lib/storage";
import { REHYDRATE } from "redux-persist/es/constants";
import { persistReducer } from "redux-persist";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/auth";

export const signup = createAsyncThunk(
	"auth/signup",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/signup`, userData, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const signin = createAsyncThunk(
	"auth/signin",
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${API_URL}/signin`, userData, {
				headers: { "Content-Type": "application/json" },
			});
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const googleAuth = createAsyncThunk(
	"auth/googleAuth",
	async (googleUserData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/signin-google`,
				googleUserData,
				{
					headers: { "Content-Type": "application/json" },
				}
			);
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const updateUser = createAsyncThunk(
	"auth/updateUser",
	async ({ id, userData }, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.currentUser.sanitizedUser.token;
			const response = await axios.put(
				`${API_URL}/update-user/${id}`,
				userData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const signout = createAsyncThunk(
	"auth/signout",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.currentUser.sanitizedUser.token;
			const response = await axios.post(
				`${API_URL}/signout`,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		currentUser: null,
		loading: false,
		message: null,
		error: null,
	},
	reducers: {
		clearMessage: (state) => {
			state.message = null;
		},
		clearError: (state) => {
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(REHYDRATE, (state, action) => {
				if (action.payload && action.payload.auth) {
					return {
						...state,
						...action.payload.auth,
					};
				}
			})
			.addCase(signup.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(signup.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(signup.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred, signup failed";
			})
			.addCase(signin.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(signin.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while signing in";
			})
			.addCase(googleAuth.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(googleAuth.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(googleAuth.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while signing in";
			})
			.addCase(updateUser.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = action.payload || action.payload.auth;
				state.message = action.payload.message;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while updating";
			})
			.addCase(signout.pending, (state) => {
				state.loading = true;
				state.message = null;
				state.error = null;
			})
			.addCase(signout.fulfilled, (state, action) => {
				state.loading = false;
				state.currentUser = null;
				state.message = action.payload.message;
			})
			.addCase(signout.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || "An error occurred while updating";
			});
	},
});

export const { clearMessage, clearError } = authSlice.actions;

export default persistReducer(
	{
		key: "auth",
		storage,
	},
	authSlice.reducer
);
