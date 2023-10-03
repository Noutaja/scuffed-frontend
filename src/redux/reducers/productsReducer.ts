import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	Product,
	ProductCreate,
	ProductUpdate,
	productReducerInitialState,
} from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: productReducerInitialState = {
	products: [],
	status: "idle",
};

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
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
	"products/fetchOneProduct",
	async (id: number) => {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products/${id}`
			);
			const product = await response.data;
			const arr = [product];
			return arr;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const deleteOneProduct = createAsyncThunk(
	"products/deleteOneProduct",
	async (id: number) => {
		try {
			const response = await axios.delete<boolean>(
				`https://api.escuelajs.co/api/v1/products/${id}`
			);
			if (!response.data) {
				throw new Error("Cannot delete");
			}
			return id;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const createProduct = createAsyncThunk(
	"products/createProduct",
	async (newProduct: ProductCreate) => {
		try {
			const response = await axios.post<Product>(
				`https://api.escuelajs.co/api/v1/products/`,
				newProduct
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ id, data }: ProductUpdate) => {
		try {
			const response = await axios.put<Product>(
				`https://api.escuelajs.co/api/v1/products/${id}`,
				data
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getAllProducts: (state) => {
			//Might not need this one
			return {
				...state,
				products: state.products,
			};
		},
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

		builder.addCase(fetchOneProduct.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				return {
					...state,
					products: action.payload,
					status: "idle",
				};
			}
		});

		builder.addCase(deleteOneProduct.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				if (typeof action.payload === "number") {
					state.products = state.products.filter(
						(p) => p.id !== action.payload
					);
				}
			}
		});

		builder.addCase(createProduct.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				state.products.push(action.payload);
			}
		});

		builder.addCase(updateProduct.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				const product = action.payload as Product;
				const index = state.products.findIndex((p) => p.id === product.id);
				state.products[index] = product;
			}
		});
	},
});

const productsReducer = productsSlice.reducer;
export const { getAllProducts } = productsSlice.actions;
export default productsReducer;
