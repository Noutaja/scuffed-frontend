import { configureStore } from "@reduxjs/toolkit";

import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import { CartReducerState } from "../types/Types";
import cartReducer from "./reducers/cartReducer";
import uiReducer from "./reducers/uiReducer";
import categoriesReducer from "./reducers/categoriesReducer";
import { UserReducerState } from "../types/UserTypes";
import ordersReducer from "./reducers/ordersReducer";
import addressesReducer from "./reducers/addressesReducer";

const preloadedUsersState: UserReducerState = {
	users: [],
	currentUser: undefined,
	accessToken: localStorage.getItem("access-token") || "",
	status: "idle",
	error: undefined,
};

const preloadedCartState: CartReducerState = {
	items: JSON.parse(localStorage.getItem("cart") || "[]"),
	status: "idle",
	error: undefined,
};
const store = createStore();
store.subscribe(updateLocalStorage);

export function createStore() {
	return configureStore({
		reducer: {
			productsReducer,
			categoriesReducer,
			usersReducer,
			cartReducer,
			uiReducer,
			ordersReducer,
			addressesReducer,
		},
		preloadedState: {
			usersReducer: preloadedUsersState,
			cartReducer: preloadedCartState,
		},
	});
}

function updateLocalStorage() {
	const accessToken = store.getState().usersReducer.accessToken;
	localStorage.setItem("access-token", accessToken);
	const cart = store.getState().cartReducer.items;
	localStorage.setItem("cart", JSON.stringify(cart));
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
