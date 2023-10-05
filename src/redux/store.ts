import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";
import { userReducerInitialState } from "../types/Types";

const preloadedUsersState: userReducerInitialState = {currentUser: undefined, accessToken: localStorage.getItem("access-token") || "", status: "idle"}
const store = createStore();
store.subscribe(updateLocalStorage);

export function createStore() {
	return configureStore({
		reducer: { productsReducer, usersReducer },
		preloadedState: {
			usersReducer: preloadedUsersState
		}
	});
}

function updateLocalStorage() {
	const accessToken = store.getState().usersReducer.accessToken
	localStorage.setItem("access-token", accessToken)
}

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
