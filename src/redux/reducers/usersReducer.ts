import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userReducerInitialState } from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: userReducerInitialState = {
	products: [],
	status: "idle",
};

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
	try {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/users`);
		const users = await response.data;
		return users;
	} catch (e) {
		const error = e as AxiosError;
		return error;
	}
});

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getAllUsers.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				return {
					...state,
					users: action.payload,
					loading: false,
				};
			}
		});
	},
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
