export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: string[];
	creationAt: string;
	updatedAt: string;
};

export type ProductCreate = {
	title: string;
	price: number;
	description: string;
	category: number;
	images: string[];
};

export type ProductUpdate = {
	id: number;
	data: Partial<Product>;
};

export type ProductReducerInitialState = {
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

export type Role = "customer" | "admin";

export type User = {
  id: number,
  email: string,
  password: string,
  name: string,
  role: Role,
  avatar: string
}

export type UserCreate = {
	email: string,
  password: string,
  name: string,
  avatar: string
}

export type UserCredentials = {
	email: string;
	password: string;
}

export type userReducerInitialState = {
	status: "idle" | "loading";
	currentUser: User | undefined;
	accessToken: string;
	error: string | undefined;
};
