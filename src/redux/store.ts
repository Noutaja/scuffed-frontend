import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import { CartReducerState, UserReducerState } from "../types/Types";
import cartReducer from "./reducers/cartReducer";

const preloadedUsersState: UserReducerState = {
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
		reducer: { productsReducer, usersReducer, cartReducer },
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
