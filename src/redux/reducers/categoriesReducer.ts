import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Category,
	CategoryCreate,
	CategoryUpdate,
	CategoriesReducerState,
} from "../../types/CategoryTypes";

import { PaginationOptions } from "../../types/Types";

const baseUrl = "http://localhost:5157/api/v1/";

const initialState: CategoriesReducerState = {
	categories: [],
	status: "idle",
	error: undefined,
};

export const fetchAllCategories = createAsyncThunk(
	"categories/fetchAllCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${baseUrl}categories`);
			const categories = await response.data;
			return categories;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchCategoriesWithPagination = createAsyncThunk(
	"categories/fetchCategoriesWithPagination",
	async (options: PaginationOptions, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${baseUrl}categories?offset=${options.offset}&limit=${options.limit}`
			);
			const categories = await response.data;
			return categories;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchOneCategory = createAsyncThunk<
	Category[],
	string,
	{ rejectValue: string }
>("categories/fetchOneCategory", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${baseUrl}categories/${id}`);
		const category = await response.data;
		const arr = [category];
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const deleteOneCategory = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("categories/deleteOneCategory", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.delete<boolean>(
			`${baseUrl}categories/${id}`
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

export const createCategory = createAsyncThunk<
	Category,
	CategoryCreate,
	{ rejectValue: string }
>(
	"categories/createCategory",
	async (data: CategoryCreate, { rejectWithValue }) => {
		try {
			const response = await axios.post<Category>(
				`${baseUrl}categories/`,
				data.category,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const updateCategory = createAsyncThunk<
	Category,
	CategoryUpdate,
	{ rejectValue: string }
>(
	"categories/updateCategory",
	async (data: CategoryUpdate, { rejectWithValue }) => {
		try {
			const response = await axios.patch<Category>(
				`${baseUrl}categories/${data.id}`,
				data.category,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {
		setCategoriesError: (state, action) => {
			return {
				...state,
				error: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllCategories.fulfilled, (state, action) => {
				return {
					...state,
					categories: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllCategories.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAllCategories.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(
				fetchCategoriesWithPagination.fulfilled,
				(state, action) => {
					return {
						...state,
						categories: action.payload,
						status: "idle",
					};
				}
			)
			.addCase(fetchCategoriesWithPagination.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(
				fetchCategoriesWithPagination.rejected,
				(state, action) => {
					const error = action.payload as string;
					return {
						...state,
						status: "idle",
						error: error,
					};
				}
			);

		builder
			.addCase(fetchOneCategory.fulfilled, (state, action) => {
				return {
					...state,
					categories: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOneCategory.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOneCategory.rejected, (state, action) => {
				return {
					...state,
					status: "idle",
					error: action.payload,
				};
			})

			.addCase(deleteOneCategory.fulfilled, (state, action) => {
				state.categories = state.categories.filter(
					(p) => p.id !== action.payload
				);
			})
			.addCase(deleteOneCategory.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});

		builder
			.addCase(createCategory.fulfilled, (state, action) => {
				state.categories.push(action.payload);
			})
			.addCase(createCategory.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(updateCategory.fulfilled, (state, action) => {
				const category = action.payload as Category;
				const index = state.categories.findIndex(
					(p) => p.id === category.id
				);
				state.categories[index] = category;
			})
			.addCase(updateCategory.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const categoriesReducer = categoriesSlice.reducer;
export const { setCategoriesError } = categoriesSlice.actions;
export default categoriesReducer;
