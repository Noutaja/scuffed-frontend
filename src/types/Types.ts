export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: Image[];
};

export type ProductCreate = {
	title: string;
	price: number;
	description: string;
	categoryId: string;
	images: Image[];
};

export type ProductUpdate = Partial<ProductCreate> & { id: string };

export type ProductsReducerState = {
	products: Product[];
	status: "idle" | "loading";
	error: string | undefined;
};

export type Image = {
	id: string;
	url: string;
};

export type ItemWithId<T> = {
	item: T;
	id: string;
};

export type CategoriesReducerState = {
	categories: Category[];
	status: "idle" | "loading";
	error: string | undefined;
};

export type Category = {
	id: string;
	name: string;
	image: string;
};

export type PaginationOptions = {
	limit: number;
	offset: number;
};

export enum UserRole {
	Normal = "Normal",
	Admin = "Admin",
}

export type User = {
	id: string;
	email: string;
	password: string;
	name: string;
	role: UserRole;
	avatar: string;
};

export type UserCreate = {
	email: string;
	password: string;
	name: string;
	role: UserRole;
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
	categoryFilter: string;
};

export type UiSortBy = "price";

export type UiSortDirection = "asc" | "desc";

export type PasswordFieldValidationObject = {
	text: string;
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
	setValidationMessage: React.Dispatch<React.SetStateAction<string>>;
};
