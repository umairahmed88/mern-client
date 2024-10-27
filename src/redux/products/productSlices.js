import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { getAuthToken } from "../../utils/getAuthToken";

const API_URL = "https://mern-api-ua.vercel.app/api/v1/products";

export const createProduct = createAsyncThunk(
	"product/createProduct",
	async (productData, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.post(
				`${API_URL}/create-product`,
				productData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const fetchAllProducts = createAsyncThunk(
	"product/fetchAllProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/get-all-products`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const fetchProduct = createAsyncThunk(
	"product/fetchProduct",
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/get-one-product/${id}`, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const updateProduct = createAsyncThunk(
	"product/update-product",
	async ({ id, updateData }, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/update-product/${id}`,
				updateData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const increaseProduct = createAsyncThunk(
	"product/increaseProduct",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/increase-product/${id}`,
				{},
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

export const decreaseProduct = createAsyncThunk(
	"product/decreaseProduct",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.put(
				`${API_URL}/decrease-product/${id}`,
				{},
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

export const deleteProduct = createAsyncThunk(
	"product/deleteProduct",
	async (id, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/delete-product/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const deleteAllProducts = createAsyncThunk(
	"product/deleteAllProducts",
	async (_, { getState, rejectWithValue }) => {
		try {
			const token = getAuthToken(getState, rejectWithValue);

			if (!token) return rejectWithValue({ message: "Please login." });

			const response = await axios.delete(`${API_URL}/delete-all-products`, {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

export const searchProduct = createAsyncThunk(
	"product/searchProduct",
	async (searchParams, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/search`, {
				params: searchParams,
				headers: {
					"Content-Type": "application/json",
				},
			});
			return response.data;
		} catch (err) {
			return rejectWithValue(err.response ? err.response.data : err.message);
		}
	}
);

const productSlice = createSlice({
	name: "products",
	initialState: {
		product: null,
		products: [],
		searchResults: [],
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
				if (action.payload && action.payload.product) {
					return {
						...state,
						...action.payload.product,
					};
				}
			})
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.push(action.payload);
				state.message = action.payload?.message;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				const updatedProduct = action.payload;
				const index = state.products.findIndex(
					(product) => product._id === updatedProduct._id
				);
				if (index !== -1) {
					state.products[index] = updatedProduct;
				}
				state.message = action.payload?.message;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(increaseProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(increaseProduct.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.product) {
					const index = state.products.findIndex(
						(product) => product._id === action.payload.product._id
					);
					if (index !== -1) {
						state.products[index] = action.payload.product;
					}
				}
				state.message = action.payload?.message;
			})
			.addCase(increaseProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(decreaseProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(decreaseProduct.fulfilled, (state, action) => {
				state.loading = false;
				if (action.payload.product) {
					const index = state.products.findIndex(
						(product) => product._id === action.payload.product._id
					);
					if (index !== -1) {
						state.products[index] = action.payload.product;
					}
				}
				state.message = action.payload?.message;
			})
			.addCase(decreaseProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(fetchProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.product = action.payload || action.payload.product;
				state.message = action.payload?.message;
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(fetchAllProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.message = action.payload?.message;
			})
			.addCase(fetchAllProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(searchProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(searchProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.searchResults = action.payload.products;
				state.message = action.payload?.message;
			})
			.addCase(searchProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					(product) => product._id === action.meta.arg
				);
				state.message = action.payload?.message;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			})
			.addCase(deleteAllProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.message = null;
			})
			.addCase(deleteAllProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = [];
				state.message = action.payload?.message;
			})
			.addCase(deleteAllProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message;
			});
	},
});

export const { clearMessage, clearError } = productSlice.actions;

export default persistReducer(
	{
		key: "product",
		storage,
	},
	productSlice.reducer
);
