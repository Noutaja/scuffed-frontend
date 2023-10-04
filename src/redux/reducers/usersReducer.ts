import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserCredentials, userReducerInitialState } from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: userReducerInitialState = {
	users: [],
	status: "idle",
	currentUser: undefined
};

export const fetchAllUsers = createAsyncThunk("getAllUsers", async () => {
	try {
		const response = await axios.get(`https://api.escuelajs.co/api/v1/users`);
		const users = await response.data;
		return users;
	} catch (e) {
		const error = e as AxiosError;
		return error;
	}
});

export const loginWithCredentials = createAsyncThunk(
	"loginWithCredentials",
	async (credentials: UserCredentials, { dispatch }) => {
		try {
			const response = await axios.post(
				"https://api.escuelajs.co/api/v1/auth/login",
				credentials
			);
			const accessToken = response.data;
			const authenticatedResponse = await dispatch(
				authenticateWithToken(accessToken)
			);
			if (typeof authenticatedResponse.payload === "string" || !authenticatedResponse.payload) {
				throw Error(authenticatedResponse.payload || "Cannot login")
		} else {
				// localStorage.setItem("access_token", access_token)
				return authenticatedResponse.payload as User
		}
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const authenticateWithToken = createAsyncThunk(
	"authenticateWithToken",
	async (accessToken:any) => {
		try {
			const response = await axios.get(
				"https://api.escuelajs.co/api/v1/auth/profile",
				{headers: {
					Authorization: `Bearer ${accessToken}`
				}}
			);
			return response.data;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

const usersSlice = createSlice({
	name: "users/fetchAllUsers",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				return {
					...state,
					users: action.payload,
					status: "idle",
				};
			}
		});

		builder.addCase(loginWithCredentials.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				state.currentUser = action.payload;
			}
		});

		builder.addCase(authenticateWithToken.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				state.currentUser = action.payload;
			}
		});
	},
});

const usersReducer = usersSlice.reducer;
export default usersReducer;
