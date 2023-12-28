import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerState } from "../../types/Types";
import { Product } from "../../types/ProductTypes";

const initialState: CartReducerState = {
	items: [],
	status: "idle",
	error: undefined,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
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
		removeOneItem: (state, action: PayloadAction<string>) => {
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
export const { addOneItem, removeOneItem, emptyCart } = cartSlice.actions;
export default cartReducer;
