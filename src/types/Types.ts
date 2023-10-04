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

export type productReducerInitialState = {
	products: Product[];
	status: "idle" | "loading" | "error";
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

export type User = {
  id: number,
  email: string,
  password: string,
  name: string,
  role: string,
  avatar: string
}

export type UserCredentials = {
	email: string;
	password: string;
}

export type userReducerInitialState = {
	users: User[];
	status: "idle" | "loading" | "error";
	currentUser: User | undefined;
};
