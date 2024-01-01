import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Address,
	AddressCreate,
	AddressDelete,
	AddressGet,
	AddressUpdate,
	AddressesReducerState,
} from "../../types/AddressTypes";

import { PaginationOptions } from "../../types/Types";
import { baseUrl } from "../../shared/shared";

const Url = baseUrl;

const initialState: AddressesReducerState = {
	addresses: [],
	status: "idle",
	error: undefined,
};

export const fetchAllAddresses = createAsyncThunk(
	"addresses/fetchAllAddresses",
	async (options: AddressGet, { rejectWithValue }) => {
		try {
			let searchUrl = "";
			if (options.ownerID) searchUrl += `OwnerID=${options.ownerID}`;

			if (searchUrl.length) searchUrl = "?" + searchUrl;
			else searchUrl = "/";

			const response = await axios.get(`${Url}addresses${searchUrl}`, {
				headers: {
					Authorization: `Bearer ${options.accessToken}`,
				},
			});
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
				`${Url}addresses?offset=${options.offset}&limit=${options.limit}`
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
		const response = await axios.get(`${Url}addresses/${id}`);
		const address = await response.data;
		const arr = [address];
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const deleteOneAddress = createAsyncThunk<
	string,
	AddressDelete,
	{ rejectValue: string }
>(
	"addresses/deleteOneAddress",
	async (data: AddressDelete, { rejectWithValue }) => {
		try {
			const response = await axios.delete<boolean>(
				`${Url}addresses/${data.id}`,
				{
					headers: {
						Authorization: `Bearer ${data.accessToken}`,
					},
				}
			);
			if (!response.data) {
				throw new Error("Cannot delete");
			}
			return data.id;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const createAddress = createAsyncThunk<
	Address,
	AddressCreate,
	{ rejectValue: string }
>(
	"addresses/createAddress",
	async (data: AddressCreate, { rejectWithValue }) => {
		try {
			const response = await axios.post<Address>(
				`${Url}addresses/`,
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
				`${Url}addresses/${data.id}`,
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
