import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiReducerState } from "../../types/Types";

const initialState: UiReducerState = {
	searchText: "",
	sortBy: "title",
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		getSearchText: (state) => {
			return {
				...state,
				searchText: state.searchText
			};
		},
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
	},
});

const uiReducer = uiSlice.reducer;
export const { getSearchText, setSearchText } = uiSlice.actions;
export default uiReducer;