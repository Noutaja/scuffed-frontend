import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: {
	products: Product[];
	status: string;
} = {
	products: [],
	status: "idle",
};

export const fetchAllProducts = createAsyncThunk(
	"products/getAllProducts",
	async () => {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products`
			);
			const products = await response.data;
			return products;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const fetchOneProduct = createAsyncThunk(
	"products/getOneProduct",
	async (id: number) => {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products/${id}`
			);
			const product = await response.data;
			return product;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
)

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getAllProducts: (state) => { //Might not need this one
			return {
				...state,
				products: state.products
			};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				return {
					...state,
					products: action.payload,
					status: "idle",
				};
			}
		});
	},
});

const productsReducer = productsSlice.reducer;
export const { getAllProducts} = productsSlice.actions;
export default productsReducer;
