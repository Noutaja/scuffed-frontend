import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/productsReducer";
import usersReducer from "./reducers/usersReducer";


export function createStore() {
  return (configureStore({
    reducer: {productsReducer, usersReducer}
  }))
}

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;