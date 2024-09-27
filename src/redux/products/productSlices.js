import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REHYDRATE } from "redux-persist/es/constants";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const API_URL = "/api/v1/products";

export const createProduct = createAsyncThunk(
	"product/createProduct",
	async (productData, { getState, rejectWithValue }) => {
		try {
			const token = getState().auth.currentUser.sanitizedUser.token;
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
			console.log(response.data);
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
				state.message = action.payload.message;
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
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
