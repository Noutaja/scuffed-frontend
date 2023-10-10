import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiReducerState } from "../../types/Types";

const initialState: UiReducerState = {
	searchText: "",
	sortBy: "price",
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload
    }
	},
});

const uiReducer = uiSlice.reducer;
export const { setSearchText } = uiSlice.actions;
export default uiReducer;