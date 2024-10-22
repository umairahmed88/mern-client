import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getAuthToken } from "../../utils/getAuthToken";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/cartItems";

export const fetchAllItems = createAsyncThunk(
	"cartItem/fetchAllItems",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.get(`${API_URL}/get-all-items`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			console.log(response.data);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const addToCart = createAsyncThunk(
	"cartItem/addToCart",
	async (cartItemData, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.post(
				`${API_URL}/add-to-cart`,
				cartItemData,
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

export const increaseItem = createAsyncThunk(
	"cartItem/increaseItem",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/increase-item/${id}`,
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

export const decreaseItem = createAsyncThunk(
	"cartItem/decreaseItem",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/decrease-item/${id}`,
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

export const updateItemQuantity = createAsyncThunk(
	"cartItem/updateItemQuantity",
	async ({ id, quantity }, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/update-item-quantity/${id}`,
				{ quantity },
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

export const deleteItem = createAsyncThunk(
	"cartItem/deleteItem",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/delete-item/${id}`, {
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

export const clearCart = createAsyncThunk(
	"cartItem/clearCart",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/clear-cart`, {
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
				state.error = action.payload.message || action.payload;
			})
			.addCase(fetchAllItems.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(fetchAllItems.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems = action.payload.items;
				state.message = action.payload.message;
			})
			.addCase(fetchAllItems.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(increaseItem.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(increaseItem.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.cartItems.findIndex(
					(item) => item._id === action.payload.item._id
				);
				if (index !== -1) {
					state.cartItems[index] = action.payload.item;
				}
				const product = state.products.find(
					(product) => product._id === action.payload.item.productId
				);
				if (product) {
					product.quantity = action.payload.updatedProductQuantity;
				}
				state.message = action.payload.message;
			})
			.addCase(increaseItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(decreaseItem.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(decreaseItem.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.cartItems.findIndex(
					(item) => item._id === action.payload.item._id
				);
				if (index !== -1) {
					if (action.payload.item.quantity === 0) {
						state.cartItems.splice(index, 1);
					} else {
						state.cartItems[index] = action.payload.item;
					}
				}
				const product = state.products.find(
					(product) => product._id === action.payload.item.productId
				);
				if (product) {
					product.quantity = action.payload.updatedProductQuantity;
				}
				state.message = action.payload.message;
			})
			.addCase(decreaseItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(updateItemQuantity.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(updateItemQuantity.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.cartItems.findIndex(
					(item) => item._id === action.payload.item._id
				);
				if (index !== -1) {
					const previousQuantity = state.cartItems[index].quantity;
					const newQuantity = action.payload.item.quantity;

					state.cartItems[index] = action.payload.item;

					const product = state.products.find(
						(product) => product._id === action.payload.item.productId
					);
					if (product) {
						const quantityChange = newQuantity - previousQuantity;
						product.quantity -= quantityChange;
					}
				}
				state.message = action.payload.message;
			})
			.addCase(updateItemQuantity.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(deleteItem.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems = state.cartItems.filter(
					(item) => item._id !== action.meta.arg
				);
				const deletedItem = action.meta.arg;
				const productId = state.cartItems.find(
					(item) => item._id === deletedItem
				)?.productId;
				if (productId) {
					const product = state.products.find(
						(product) => product._id === productId
					);
					if (product) {
						product.quantity += action.meta.quantity;
					}
				}
				state.message = action.payload.message;
			})
			.addCase(deleteItem.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			.addCase(clearCart.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(clearCart.fulfilled, (state, action) => {
				state.loading = false;
				state.cartItems.forEach((cartItem) => {
					const product = state.products.find(
						(product) => product._id === cartItem.productId
					);
					if (product) {
						product.quantity += cartItem.quantity;
					}
				});
				state.cartItems = [];
				state.message = action.payload.message;
			})
			.addCase(clearCart.rejected, (state, action) => {
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
