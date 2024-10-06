import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/cartItems";

export const addToCart = createAsyncThunk(
	"cartItem/addToCart",
	async (cartItemData, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.currentUser.sanitizedUser.token;
			const response = await axios.post(
				`${API_URL}/add-to-cart`,
				cartItemData,
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

const cartItemsSlice = createSlice({
	name: "cartItem",
	initialState: {
		cartItems: [],
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
				if (action.payload && action.payload.cartItem) {
					return {
						...state,
						...action.payload.cartItem,
					};
				}
			})
			.addCase(addToCart.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems.push(action.payload.cartItem);
				state.message = action.payload.message;
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			});
	},
});

export const { clearMessage, clearError } = cartItemsSlice.actions;

export default persistReducer(
	{ key: "cartItem", storage },
	cartItemsSlice.reducer
);
