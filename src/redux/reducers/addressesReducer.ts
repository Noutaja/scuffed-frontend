import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Address,
	AddressCreate,
	AddressUpdate,
	AddressesReducerState,
} from "../../types/AddressTypes";

import { PaginationOptions } from "../../types/Types";

const baseUrl = "http://localhost:5157/api/v1/";

const initialState: AddressesReducerState = {
	addresses: [],
	status: "idle",
	error: undefined,
};

export const fetchAllAddresses = createAsyncThunk(
	"addresses/fetchAllAddresses",
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${baseUrl}addresses`);
			const addresses = await response.data;

			return addresses;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchAddressesWithPagination = createAsyncThunk(
	"addresses/fetchAddressesWithPagination",
	async (options: PaginationOptions, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${baseUrl}addresses?offset=${options.offset}&limit=${options.limit}`
			);
			const addresses = await response.data;
			return addresses;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchOneAddress = createAsyncThunk<
	Address[],
	string,
	{ rejectValue: string }
>("addresses/fetchOneAddress", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${baseUrl}addresses/${id}`);
		const address = await response.data;
		const arr = [address];
		console.log(arr);
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const deleteOneAddress = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("addresses/deleteOneAddress", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.delete<boolean>(
			`${baseUrl}addresses/${id}`
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

export const createAddress = createAsyncThunk<
	Address,
	AddressCreate,
	{ rejectValue: string }
>(
	"addresses/createAddress",
	async (data: AddressCreate, { rejectWithValue }) => {
		try {
			const response = await axios.post<Address>(
				`${baseUrl}addresses/`,
				data.address,
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

export const updateAddress = createAsyncThunk<
	Address,
	AddressUpdate,
	{ rejectValue: string }
>(
	"addresses/updateAddress",
	async (data: AddressUpdate, { rejectWithValue }) => {
		try {
			const response = await axios.patch<Address>(
				`${baseUrl}addresses/${data.id}`,
				data.address,
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

const addressesSlice = createSlice({
	name: "addresses",
	initialState,
	reducers: {
		setAddressesError: (state, action) => {
			return {
				...state,
				error: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllAddresses.fulfilled, (state, action) => {
				return {
					...state,
					addresses: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllAddresses.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAllAddresses.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(
				fetchAddressesWithPagination.fulfilled,
				(state, action) => {
					return {
						...state,
						addresses: action.payload,
						status: "idle",
					};
				}
			)
			.addCase(fetchAddressesWithPagination.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAddressesWithPagination.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(fetchOneAddress.fulfilled, (state, action) => {
				return {
					...state,
					addresses: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOneAddress.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOneAddress.rejected, (state, action) => {
				return {
					...state,
					status: "idle",
					error: action.payload,
				};
			})

			.addCase(deleteOneAddress.fulfilled, (state, action) => {
				state.addresses = state.addresses.filter(
					(p) => p.id !== action.payload
				);
			})
			.addCase(deleteOneAddress.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});

		builder
			.addCase(createAddress.fulfilled, (state, action) => {
				state.addresses.push(action.payload);
			})
			.addCase(createAddress.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(updateAddress.fulfilled, (state, action) => {
				const address = action.payload as Address;
				const index = state.addresses.findIndex(
					(p) => p.id === address.id
				);
				state.addresses[index] = address;
			})
			.addCase(updateAddress.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const addressesReducer = addressesSlice.reducer;
export const { setAddressesError } = addressesSlice.actions;
export default addressesReducer;
