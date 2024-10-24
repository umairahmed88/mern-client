import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getAuthToken } from "../../utils/getAuthToken";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/orders";

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
			console.log(response.data);
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
			});
	},
});

export const { clearMessage, clearError } = ordersSlice.actions;

export default persistReducer({ key: "order", storage }, ordersSlice.reducer);

/*
You did not provide an API key. 
You need to provide your API key in the Authorization header, 
using Bearer auth (e.g. 'Authorization: Bearer YOUR_SECRET_KEY'). 
See https://stripe.com/docs/api#authentication for details, 
or we can help at https://support.stripe.com/.
*/
