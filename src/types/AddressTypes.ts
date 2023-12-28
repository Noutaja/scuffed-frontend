import { User } from "./UserTypes";

export type Address = {
	id: string;
	user: User;
	street: string;
	zipcode: string;
	city: string;
	country: string;
};

export type AddressCreate = {
	address: {
		street: string;
		zipcode: string;
		city: string;
		country: string;
	};
	accessToken: string;
};

export type AddressUpdate = {
	address: {
		street: string;
		zipcode: string;
		city: string;
		country: string;
	};
	accessToken: string;
	id: string;
};

export type AddressesReducerState = {
	addresses: Address[];
	status: "idle" | "loading";
	error: string | undefined;
};
