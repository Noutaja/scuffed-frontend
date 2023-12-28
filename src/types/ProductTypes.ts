import { Category, Image } from "./Types";

export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: Image[];
};

export type ProductCreate = {
	product: {
		title: string;
		price: number;
		description: string;
		categoryId: string;
		images: Image[];
	};
	accessToken: string;
};

export type ProductUpdate = {
	product: {
		title?: string;
		price?: number;
		description?: string;
		categoryId?: string;
		images?: Image[];
	};
	accessToken: string;
	id: string;
};

export type ProductsReducerState = {
	products: Product[];
	status: "idle" | "loading";
	error: string | undefined;
};
