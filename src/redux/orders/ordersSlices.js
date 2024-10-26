import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getAuthToken } from "../../utils/getAuthToken";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/orders";

export const fetchAllOrders = createAsyncThunk(
	"order/fetchAllOrders",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.get(`${API_URL}/get-all`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const fetchOneOrder = createAsyncThunk(
	"order/fetchOneOrder",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.get(`${API_URL}/get-one/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const createOrder = createAsyncThunk(
	"order/createOrder",
	async (orderData, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.post(`${API_URL}/create-order`, orderData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const updateOrder = createAsyncThunk(
	"order/updateOrder",
	async ({ id, updateData }, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/update-order/${id}`,
				updateData,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const deleteOrder = createAsyncThunk(
	"order/deleteOrder",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/delete-one/${id}`, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const deleteAllOrders = createAsyncThunk(
	"order/deleteAllOrders",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/delete-all`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

const ordersSlice = createSlice({
	name: "order",
	initialState: {
		orders: [],
		order: null,
		loading: false,
		error: null,
		message: null,
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
				if (action.payload && action.payload.order) {
					return {
						...state,
						...action.payload.order,
					};
				}
			})
			.addCase(fetchAllOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(fetchAllOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = action.payload.orders;
				state.message = action.payload.message;
			})
			.addCase(fetchAllOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(fetchOneOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(fetchOneOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.order = action.payload.order || action.payload;
				state.message = action.payload.message;
			})
			.addCase(fetchOneOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(createOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.orders.push(action.payload.orderSummary);
				state.message = action.payload.message;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message || action.payload;
			})
			.addCase(updateOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(updateOrder.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.orders.findIndex(
					(order) => order._id === action.payload._id
				);
				if (index !== -1) {
					state.orders[index] = action.payload;
				}
				state.message = action.payload.message;
			})
			.addCase(updateOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(deleteOrder.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(deleteOrder.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = state.orders.filter(
					(order) => order._id !== action.meta.arg
				);
				state.message = action.payload.message;
			})
			.addCase(deleteOrder.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(deleteAllOrders.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(deleteAllOrders.fulfilled, (state, action) => {
				state.loading = false;
				state.orders = [];
				state.message = action.payload.message;
			})
			.addCase(deleteAllOrders.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			});
	},
});

export const { clearMessage, clearError } = ordersSlice.actions;

export default persistReducer({ key: "order", storage }, ordersSlice.reducer);
