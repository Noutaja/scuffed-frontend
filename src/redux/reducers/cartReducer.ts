import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerState, Product } from "../../types/Types";

const initialState: CartReducerState = {
	items: [],
	status: "idle",
	error: undefined,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		getAllItems: (state) => {
			return {
				...state,
				items: state.items,
			};
		},
		addOneItem: (state, action: PayloadAction<Product>) => {
			const index = state.items.findIndex(
				(i) => i.product.id === action.payload.id
			);
			if (index >= 0) {
				state.items[index].amount++;
			} else {
				const newCartItem = { product: action.payload, amount: 1 };
				state.items.push(newCartItem);
			}
		},
		removeOneItem: (state, action: PayloadAction<number>) => {
			const index = state.items.findIndex(
				(i) => i.product.id === action.payload
			);
			if (index >= 0) {
				state.items[index].amount--;
				if (state.items[index].amount < 1) {
					state.items.splice(index, 1);
				}
			}
		},
		emptyCart: (state) => {
			return initialState;
		},
	},
});

const cartReducer = cartSlice.reducer;
export const { getAllItems, addOneItem, removeOneItem, emptyCart } =
	cartSlice.actions;
export default cartReducer;
