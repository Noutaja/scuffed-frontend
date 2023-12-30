import { Product } from "./ProductTypes";

export type Image = {
	id: string;
	url: string;
	fromDB?: boolean;
};

export type ItemWithId<T> = {
	item: T;
	id: string;
};

export type PaginationOptions = {
	limit: number;
	offset: number;
};

export type CartReducerState = {
	items: CartItem[];
	status: "idle" | "loading";
	error: string | undefined;
};

export type CartItem = {
	product: Product;
	amount: number;
};

export type UiReducerState = {
	searchText: string;
	sortBy: UiSortBy;
	sortDirection: UiSortDirection;
	paginPage: number;
	paginPerPage: number;
	categoryFilter: string;
};

export type UiSortBy = "price";

export type UiSortDirection = "asc" | "desc";

export type PasswordFieldValidationObject = {
	text: string;
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
	setValidationMessage: React.Dispatch<React.SetStateAction<string>>;
};
