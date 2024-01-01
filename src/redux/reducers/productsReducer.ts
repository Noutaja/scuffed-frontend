import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Product,
	ProductCreate,
	ProductDelete,
	ProductUpdate,
	ProductsReducerState,
} from "../../types/ProductTypes";
import { PaginationOptions } from "../../types/Types";
import { baseUrl } from "../../shared/shared";

const Url = baseUrl;

const initialState: ProductsReducerState = {
	products: [],
	status: "idle",
	error: undefined,
};

export const fetchAllProducts = createAsyncThunk(
	"products/fetchAllProducts",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${Url}products`);
			const products = await response.data;
			return products;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchProductsWithPagination = createAsyncThunk(
	"products/fetchProductsWithPagination",
	async (options: PaginationOptions, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${Url}products?offset=${options.offset}&limit=${options.limit}`
			);
			const products = await response.data;
			return products;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchOneProduct = createAsyncThunk<
	Product[],
	string,
	{ rejectValue: string }
>("products/fetchOneProduct", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${Url}products/${id}`);
		const product = await response.data;
		const arr = [product];
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.response?.data as string);
	}
});

export const deleteOneProduct = createAsyncThunk<
	string,
	ProductDelete,
	{ rejectValue: string }
>(
	"products/deleteOneProduct",
	async (data: ProductDelete, { rejectWithValue }) => {
		try {
			const response = await axios.delete<boolean>(
				`${Url}products/${data.id}`,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			if (!response.data) {
				throw new Error("Cannot delete");
			}
			return data.id!;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const createProduct = createAsyncThunk<
	Product,
	ProductCreate,
	{ rejectValue: string }
>(
	"products/createProduct",
	async (data: ProductCreate, { rejectWithValue }) => {
		try {
			const response = await axios.post<Product>(
				`${Url}products/`,
				data.product,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const updateProduct = createAsyncThunk<
	Product,
	ProductUpdate,
	{ rejectValue: string }
>(
	"products/updateProduct",
	async (data: ProductUpdate, { rejectWithValue }) => {
		try {
			const response = await axios.patch<Product>(
				`${Url}products/${data.id}`,
				data.product,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setProductsError: (state, action) => {
			return {
				...state,
				error: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllProducts.fulfilled, (state, action) => {
				const products: Product[] = action.payload;
				products.map((p) => p.images.map((i) => (i.fromDB = true)));
				return {
					...state,
					products: products,
					status: "idle",
				};
			})
			.addCase(fetchAllProducts.pending, (state) => {
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
			.addCase(fetchProductsWithPagination.fulfilled, (state, action) => {
				return {
					...state,
					products: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchProductsWithPagination.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchProductsWithPagination.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(fetchOneProduct.fulfilled, (state, action) => {
				const products: Product[] = action.payload;
				products.map((p) => p.images.map((i) => (i.fromDB = true)));
				return {
					...state,
					products: products,
					status: "idle",
				};
			})
			.addCase(fetchOneProduct.pending, (state) => {
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
				state.products = state.products.filter(
					(p) => p.id !== action.payload
				);
			})
			.addCase(deleteOneProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});

		builder
			.addCase(createProduct.fulfilled, (state, action) => {
				state.products.push(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(updateProduct.fulfilled, (state, action) => {
				const product = action.payload as Product;
				const index = state.products.findIndex(
					(p) => p.id === product.id
				);
				state.products[index] = product;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const productsReducer = productsSlice.reducer;
export const { setProductsError } = productsSlice.actions;
export default productsReducer;
