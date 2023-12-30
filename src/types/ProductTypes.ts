import { Category } from "./CategoryTypes";
import { Image } from "./Types";

export type Product = {
	id: string;
	title: string;
	price: number;
	description: string;
	category: Category;
	images: Image[];
	inventory?: number;
};

export type ProductLite = {
	title: string;
	price: number;
	description: string;
	categoryId: string;
	images: Image[];
	inventory?: number;
};

export type ProductCreate = {
	product: ProductLite;
	accessToken: string;
};

export type ProductUpdate = {
	product: {
		title?: string;
		price?: number;
		description?: string;
		categoryId?: string;
		inventory?: number;
		updatedImages?: Image[];
		newImages?: Image[];
		deletedImages?: string[];
	};
	accessToken: string;
	id: string;
};

export type ProductsReducerState = {
	products: Product[];
	status: "idle" | "loading";
	error: string | undefined;
};
