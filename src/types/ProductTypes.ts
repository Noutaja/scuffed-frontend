import { Category, Image } from "./Types";

export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: Image[];
};

export type ProductLite = {
	title: string;
	price: number;
	description: string;
	categoryId: string;
	images: Image[];
};

export type ProductCreate = {
	product: ProductLite;
	accessToken: string;
};

export type ProductUpdate = {
	product: Partial<ProductLite>;
	accessToken: string;
	id: string;
};

export type ProductsReducerState = {
	products: Product[];
	status: "idle" | "loading";
	error: string | undefined;
};
