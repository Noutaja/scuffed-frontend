export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: string[];
};

export type ProductCreate = {
	title: string;
	price: number;
	description: string;
	categoryId: number;
	images: string[];
};

export type ProductUpdate = Partial<ProductCreate> & { id: number };

export type ProductReducerState = {
	products: Product[];
	status: "idle" | "loading";
	error: string | undefined;
};

export type ItemWithId<T> = {
	item: T;
	id: number;
};

export type Category = {
	id: number;
	name: string;
	image: string;
	creationAt: string;
	updatedAt: string;
};

export type PaginationOptions = {
	limit: number;
	offset: number;
};

export type Role = "customer" | "admin";

export type User = {
	id: number;
	email: string;
	password: string;
	name: string;
	role: Role;
	avatar: string;
};

export type UserCreate = {
	email: string;
	password: string;
	name: string;
	role: "customer" | "admin";
	avatar: string;
};

export type UserCredentials = {
	email: string;
	password: string;
};

export type UserReducerState = {
	status: "idle" | "loading";
	currentUser: User | undefined;
	accessToken: string;
	error: string | undefined;
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
};

export type UiSortBy = "price";

export type UiSortDirection = "asc" | "desc";
