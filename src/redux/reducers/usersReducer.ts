import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserCredentials, userReducerInitialState } from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: userReducerInitialState = {
	status: "idle",
	currentUser: undefined,
	accessToken: ""
};

export const loginWithCredentials = createAsyncThunk(
	"users/loginWithCredentials",
	async (credentials: UserCredentials, {dispatch}) => {
		try {
			const authResponse = await dispatch(authWithCredentials(credentials));
			const profile = await dispatch(fetchProfileWithToken(authResponse.payload));
			if (typeof profile.payload === "string" || !profile.payload) {
				throw Error(profile.payload || "Cannot login")
		} else {
				return profile.payload as User
		}
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const authWithCredentials = createAsyncThunk(
	"users/authWithCredentials",
	async (credentials: UserCredentials,) => {
		try {
			const response = await axios.post(
				"https://api.escuelajs.co/api/v1/auth/login",
				credentials
			);
			const accessToken = response.data.access_token;
			return accessToken;
		} catch (e) {
			const error = e as AxiosError;
			return error;
		}
	}
);

export const fetchProfileWithToken = createAsyncThunk(
	"users/fetchProfileWithToken",
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
	reducers: {
		logoutUser: (state) => {
			localStorage.setItem("access-token", "");
			return {
				...state,
				accessToken: "",
				currentUser: undefined,
			};
		}
	},
	extraReducers: (builder) => {
		builder.addCase(authWithCredentials.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				state.accessToken = action.payload;
				state.status = "idle";
			}
		});

		builder.addCase(fetchProfileWithToken.fulfilled, (state, action) => {
			if (!(action.payload instanceof AxiosError)) {
				state.currentUser = action.payload;
				state.status = "idle";
			}
		});

		builder.addCase(loginWithCredentials.fulfilled, (state, action) => {

		});
	},
});

const usersReducer = usersSlice.reducer;
export const { logoutUser } = usersSlice.actions;
export default usersReducer;
