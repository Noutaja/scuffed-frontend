import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { CategoriesReducerState } from "../../types/Types";

const initialState: CategoriesReducerState = {
	categories: [],
	status: "idle",
	error: undefined,
};

export const fetchAllCategories = createAsyncThunk(
	"categories/fetchAllCategories",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`https://api.escuelajs.co/api/v1/categories`
			);
			const categories = await response.data;

			return categories;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllCategories.fulfilled, (state, action) => {
				return {
					...state,
					categories: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllCategories.pending, (state, action) => {
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
	},
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;