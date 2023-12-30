import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import {
	Order,
	OrderCreate,
	OrderGet,
	OrderUpdate,
	OrdersReducerState,
} from "../../types/OrderTypes";
import { PaginationOptions } from "../../types/Types";

const baseUrl = "http://localhost:5157/api/v1/";

const initialState: OrdersReducerState = {
	orders: [],
	status: "idle",
	error: undefined,
};

export const fetchAllOrders = createAsyncThunk(
	"orders/fetchAllOrders",
	async (options: OrderGet, { rejectWithValue }) => {
		try {
			let searchUrl = "";
			if (options.ownerID) searchUrl += `OwnerID=${options.ownerID}`;

			if (searchUrl.length) searchUrl = "?" + searchUrl;
			else searchUrl = "/";

			const response = await axios.get(`${baseUrl}orders${searchUrl}`, {
				headers: {
					Authorization: `Bearer ${options.accessToken}`,
				},
			});
			const orders = await response.data;
			return orders;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchOrdersWithPagination = createAsyncThunk(
	"orders/fetchOrdersWithPagination",
	async (options: PaginationOptions, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`${baseUrl}orders?offset=${options.offset}&limit=${options.limit}`
			);
			const orders = await response.data;
			return orders;
		} catch (e) {
			const error = e as AxiosError;
			return rejectWithValue(error.message);
		}
	}
);

export const fetchOneOrder = createAsyncThunk<
	Order[],
	string,
	{ rejectValue: string }
>("orders/fetchOneOrder", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.get(`${baseUrl}orders/${id}`);
		const order = await response.data;
		const arr = [order];
		console.log(arr);
		return arr;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const deleteOneOrder = createAsyncThunk<
	string,
	string,
	{ rejectValue: string }
>("orders/deleteOneOrder", async (id: string, { rejectWithValue }) => {
	try {
		const response = await axios.delete<boolean>(`${baseUrl}orders/${id}`);
		if (!response.data) {
			throw new Error("Cannot delete");
		}
		return id;
	} catch (e) {
		const error = e as AxiosError;
		return rejectWithValue(error.message);
	}
});

export const createOrder = createAsyncThunk<
	Order,
	OrderCreate,
	{ rejectValue: string }
>("orders/createOrder", async (data: OrderCreate, { rejectWithValue }) => {
	try {
		const response = await axios.post<Order>(
			`${baseUrl}orders/`,
			data.order,
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
});

export const updateOrder = createAsyncThunk<
	Order,
	OrderUpdate,
	{ rejectValue: string }
>("orders/updateOrder", async (data: OrderUpdate, { rejectWithValue }) => {
	try {
		const response = await axios.patch<Order>(
			`${baseUrl}orders/${data.id}`,
			data.order,
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
});

const ordersSlice = createSlice({
	name: "orders",
	initialState,
	reducers: {
		setOrdersError: (state, action) => {
			return {
				...state,
				error: action.payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllOrders.fulfilled, (state, action) => {
				return {
					...state,
					orders: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchAllOrders.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchAllOrders.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(fetchOrdersWithPagination.fulfilled, (state, action) => {
				return {
					...state,
					orders: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOrdersWithPagination.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOrdersWithPagination.rejected, (state, action) => {
				const error = action.payload as string;
				return {
					...state,
					status: "idle",
					error: error,
				};
			});

		builder
			.addCase(fetchOneOrder.fulfilled, (state, action) => {
				return {
					...state,
					orders: action.payload,
					status: "idle",
				};
			})
			.addCase(fetchOneOrder.pending, (state) => {
				return {
					...state,
					status: "loading",
				};
			})
			.addCase(fetchOneOrder.rejected, (state, action) => {
				return {
					...state,
					status: "idle",
					error: action.payload,
				};
			})

			.addCase(deleteOneOrder.fulfilled, (state, action) => {
				state.orders = state.orders.filter(
					(p) => p.id !== action.payload
				);
			})
			.addCase(deleteOneOrder.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});

		builder
			.addCase(createOrder.fulfilled, (state, action) => {
				state.orders.push(action.payload);
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			})

			.addCase(updateOrder.fulfilled, (state, action) => {
				const order = action.payload as Order;
				const index = state.orders.findIndex((p) => p.id === order.id);
				state.orders[index] = order;
			})
			.addCase(updateOrder.rejected, (state, action) => {
				state.status = "idle";
				state.error = action.payload;
			});
	},
});

const ordersReducer = ordersSlice.reducer;
export const { setOrdersError } = ordersSlice.actions;
export default ordersReducer;
