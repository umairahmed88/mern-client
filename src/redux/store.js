import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlices";
import productsReducer from "./products/productSlices";
import cartItemsReducer from "./cartItems/cartItemsSlices";

const rootReducer = combineReducers({
	auth: authReducer,
	product: productsReducer,
	cartItem: cartItemsReducer,
});

const persistConfig = {
	key: "root",
	storage,
	version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
