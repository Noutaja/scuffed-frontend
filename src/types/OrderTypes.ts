import { Address } from "./AddressTypes";
import { Product } from "./ProductTypes";
import { User } from "./UserTypes";

export type Order = {
	id: string;
	user: User;
	address: Address;
	status: OrderStatus;
	orderProduct: OrderProduct[];
};

export type OrderCreate = {
	order: {
		address: Address;
		orderProduct: OrderProduct[];
	};
	accessToken: string;
};

export type OrderUpdate = {
	order: {
		status?: OrderStatus;
	};
	accessToken: string;
	id: string;
};

export type OrderProduct = {
	product: Product;
	amount: number;
	price: number;
};

export type OrderStatus = "Pending" | "Sent" | "Delivered" | "Cancelled";

export type OrdersReducerState = {
	orders: Order[];
	status: "idle" | "loading";
	error: string | undefined;
};
