import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	User,
	UserCreate,
	UserCredentials,
	UserReducerState,
} from "../../types/Types";
import axios, { AxiosError } from "axios";

const initialState: UserReducerState = {
	status: "idle",
	currentUser: undefined,
	accessToken: "",
	error: "",
};

export const loginWithCredentials = createAsyncThunk<
	any,
	UserCredentials,
	{ rejectValue: string }
>(
	"users/loginWithCredentials",
	async (credentials: UserCredentials, { dispatch, rejectWithValue }) => {
		try {
			const authResponse = await dispatch(authWithCredentials(credentials));
			await dispatch(fetchProfileWithToken(authResponse.payload));
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const authWithCredentials = createAsyncThunk<
	any,
	UserCredentials,
	{ rejectValue: string }
>(
	"users/authWithCredentials",
	async (credentials: UserCredentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				"https://api.escuelajs.co/api/v1/auth/login",
				credentials
			);
			const accessToken = response.data.access_token;
			if (accessToken === "" || !accessToken) {
				throw Error("Failed to fetch access token!");
			} else {
				return accessToken;
			}
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchProfileWithToken = createAsyncThunk<
	User,
	string,
	{ rejectValue: string }
>(
	"users/fetchProfileWithToken",
	async (accessToken: any, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				"https://api.escuelajs.co/api/v1/auth/profile",
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			if (typeof response.data === "string" || !response.data) {
				throw Error(response.data || "Cannot login");
			} else {
				return response.data as User;
			}
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const createUser = createAsyncThunk<
	any,
	UserCreate,
	{ rejectValue: string }
>(
	"users/createUser",
	async (newUser: UserCreate, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.post<User>(
				"https://api.escuelajs.co/api/v1/users/",
				newUser
			);
			const userProfile = response.data;
			await dispatch(
				authWithCredentials({
					email: userProfile.email,
					password: userProfile.password,
				})
			);
			return userProfile;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		logoutUser: (state) => {
			localStorage.setItem("access-token", "");
			return {
				...state,
				accessToken: "",
				currentUser: undefined,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(authWithCredentials.fulfilled, (state, action) => {
				state.accessToken = action.payload;
				state.status = "idle";
			})
			.addCase(authWithCredentials.rejected, (state, action) => {
				state.accessToken = "";
				state.status = "idle";
				state.error = action.payload;
			})
			.addCase(authWithCredentials.pending, (state, action) => {
				state.status = "loading";
			})

			.addCase(fetchProfileWithToken.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.status = "idle";
			})
			.addCase(fetchProfileWithToken.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})
			.addCase(fetchProfileWithToken.pending, (state, action) => {
				state.status = "loading";
			})

			/**Do I even need more than .fulfilled since is only calls other functions?
			 */
			.addCase(loginWithCredentials.fulfilled, (state, action) => {})
			.addCase(loginWithCredentials.rejected, (state, action) => {})

			.addCase(createUser.fulfilled, (state, action) => {
				state.currentUser = action.payload;
				state.status = "idle";
			})
			.addCase(createUser.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})
			.addCase(createUser.pending, (state, action) => {
				state.status = "loading";
			});
	},
});

const usersReducer = usersSlice.reducer;
export const { logoutUser } = usersSlice.actions;
export default usersReducer;
