import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiReducerState, UiSortBy, UiSortDirection } from "../../types/Types";

const initialState: UiReducerState = {
	searchText: "",
	sortBy: "price",
	sortDirection: "asc",
	paginPage: 1,
	paginPerPage: 20,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;
			state.paginPage = 1;
		},
		setPaginPage: (state, action: PayloadAction<number>) => {
			state.paginPage = action.payload;
		},
		setPaginPerPage: (state, action: PayloadAction<number>) => {
			state.paginPerPage = action.payload;
		},
		setSortBy: (state, action: PayloadAction<UiSortBy>) => {
			state.sortBy = action.payload;
		},
		setSortDirection: (state, action: PayloadAction<UiSortDirection>) => {
			state.sortDirection = action.payload;
		},
	},
});

const uiReducer = uiSlice.reducer;
export const {
	setSearchText,
	setPaginPage,
	setPaginPerPage,
	setSortBy,
	setSortDirection,
} = uiSlice.actions;
export default uiReducer;
