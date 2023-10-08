import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Product,
	ProductCreate,
	ProductUpdate,
	ProductReducerInitialState,
} from "../../types/Types";

const initialState: ProductReducerInitialState = {
	products: [],
	status: "idle",
	error: undefined,
};

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/products`
			);
			const products = await response.data;

			return products;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchOneProduct = createAsyncThunk<
	Product[],
	number,
	{ rejectValue: string }
>("products/fetchOneProduct", async (id: number, { rejectWithValue }) => {
	try {
		const response = await axios.get(
			`https://api.escuelajs.co/api/v1/products/${id}`
		);
		const product = await response.data;
		const arr = [product];
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const deleteOneProduct = createAsyncThunk<
	number,
	number,
	{ rejectValue: string }
>("products/deleteOneProduct", async (id: number, { rejectWithValue }) => {
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
		return rejectWithValue(error.message);
	}
});

export const createProduct = createAsyncThunk<
	Product,
	ProductCreate,
	{ rejectValue: string }
>(
	"products/createProduct",
	async (newProduct: ProductCreate, { rejectWithValue }) => {
		try {
			const response = await axios.post<Product>(
				`https://api.escuelajs.co/api/v1/products/`,
				newProduct
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const updateProduct = createAsyncThunk<
	Product,
	ProductUpdate,
	{ rejectValue: string }
>(
	"products/updateProduct",
	async ({ id, data }: ProductUpdate, { rejectWithValue }) => {
		try {
			const response = await axios.put<Product>(
				`https://api.escuelajs.co/api/v1/products/${id}`,
				data
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
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
		builder
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				return {
					...state,
					products: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllProducts.pending, (state, action) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAllProducts.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(fetchOneProduct.fulfilled, (state, action) => {
				return {
					...state,
					products: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOneProduct.pending, (state, action) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOneProduct.rejected, (state, action) => {
				return {
					...state,
					status: "idle",
					error: action.payload,
				};
			})

			.addCase(deleteOneProduct.fulfilled, (state, action) => {
				state.products = state.products.filter((p) => p.id !== action.payload);
			})
			.addCase(deleteOneProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(createProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(updateProduct.fulfilled, (state, action) => {
				const product = action.payload as Product;
				const index = state.products.findIndex((p) => p.id === product.id);
				state.products[index] = product;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const productsReducer = productsSlice.reducer;
export const { getAllProducts } = productsSlice.actions;
export default productsReducer;
