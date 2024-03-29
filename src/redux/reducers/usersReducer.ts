import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	User,
	UserCreate,
	UserCredentials,
	UserDelete,
	UserGet,
	UserReducerState,
	UserRoleUpdate,
	UserUpdate,
} from "../../types/UserTypes";
import { PaginationOptions } from "../../types/Types";
import { baseUrl } from "../../shared/shared";

const Url = baseUrl;

const initialState: UserReducerState = {
	users: [],
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
			const authResponse = await dispatch(
				authWithCredentials(credentials)
			);
			if (authResponse.meta.requestStatus === "rejected") {
				throw Error("Failed to fetch access token!");
			}
			await dispatch(fetchProfileWithToken(authResponse.payload));
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
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
			const response = await axios.post(`${Url}auth/login`, credentials);
			const accessToken = response.data.accessToken;
			if (accessToken === "" || !accessToken) {
				throw Error("Failed to fetch access token!");
			} else {
				return accessToken;
			}
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchProfileWithToken = createAsyncThunk<
	User,
	string,
	{ rejectValue: string }
>(
	"users/fetchProfileWithToken",
	async (accessToken: string, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${Url}auth/profile`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (typeof response.data === "string" || !response.data) {
				throw Error(response.data || "Cannot fetch profile");
			} else {
				return response.data as User;
			}
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const deleteProfileWithToken = createAsyncThunk<
	User,
	string,
	{ rejectValue: string }
>(
	"users/deleteProfileWithToken",
	async (accessToken: string, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${Url}auth/profile/delete`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			if (!response.data) {
				throw new Error("Cannot delete");
			}
			return response.data.toString();
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
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
			const response = await axios.post<User>(`${Url}users/`, newUser);
			const userProfile = response.data;
			await dispatch(
				authWithCredentials({
					email: newUser.email,
					password: newUser.password,
				})
			);
			return userProfile;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchAllUsers = createAsyncThunk(
	"users/fetchAllUsers",
	async (options: UserGet, { rejectWithValue }) => {
		try {
			let searchUrl = "/";

			const response = await axios.get(`${Url}users${searchUrl}`, {
				headers: {
					Authorization: `Bearer ${options.accessToken}`,
				},
			});
			const users = await response.data;
			return users;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchUsersWithPagination = createAsyncThunk(
	"users/fetchUsersWithPagination",
	async (options: PaginationOptions, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${Url}users?offset=${options.offset}&limit=${options.limit}`
			);
			const users = await response.data;
			return users;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.response?.data as string);
		}
	}
);

export const fetchOneUser = createAsyncThunk<
	User[],
	string,
	{ rejectValue: string }
>("users/fetchOneUser", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${Url}users/${id}`);
		const user = await response.data;
		const arr = [user];
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.response?.data as string);
	}
});

export const deleteOneUser = createAsyncThunk<
	string,
	UserDelete,
	{ rejectValue: string }
>("users/deleteOneUser", async (data: UserDelete, { rejectWithValue }) => {
	try {
		const response = await axios.delete<boolean>(`${Url}users/${data.id}`, {
			headers: {
				Authorization: `Bearer ${data.accessToken}`,
			},
		});
		if (!response.data) {
			throw new Error("Cannot delete");
		}
		return data.id!;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.response?.data as string);
	}
});

export const updateUser = createAsyncThunk<
	User,
	UserUpdate,
	{ rejectValue: string }
>("users/updateUser", async (data: UserUpdate, { rejectWithValue }) => {
	try {
		const response = await axios.patch<User>(
			`${Url}users/${data.id}`,
			data.user,
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
});

export const updateUserRole = createAsyncThunk<
	User,
	UserRoleUpdate,
	{ rejectValue: string }
>("users/updateUserRole", async (data: UserRoleUpdate, { rejectWithValue }) => {
	try {
		const response = await axios.patch<User>(
			`${Url}users/role/${data.id}?userRole=${data.role}`,
			null,
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
});

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
		setUsersError: (state, action) => {
			return {
				...state,
				error: action.payload,
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
			.addCase(authWithCredentials.pending, (state) => {
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
			.addCase(createUser.pending, (state) => {
				state.status = "loading";
			})
			.addCase(fetchAllUsers.fulfilled, (state, action) => {
				return {
					...state,
					users: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllUsers.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAllUsers.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			})
			.addCase(fetchOneUser.fulfilled, (state, action) => {
				return {
					...state,
					users: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOneUser.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOneUser.rejected, (state, action) => {
				return {
					...state,
					status: "idle",
					error: action.payload,
				};
			})

			.addCase(deleteOneUser.fulfilled, (state, action) => {
				state.users = state.users.filter(
					(p) => p.id !== action.payload
				);
			})
			.addCase(deleteOneUser.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				const user = action.payload as User;
				const index = state.users.findIndex((p) => p.id === user.id);
				state.users[index] = user;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const usersReducer = usersSlice.reducer;
export const { logoutUser, setUsersError } = usersSlice.actions;
export default usersReducer;
