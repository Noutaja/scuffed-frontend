import { Product, Image } from "./Types";

export type ProductItemProps = {
	product: Product;
};

export type ProductInfoProps = {
	product: Product;
};

export type ProductEditModalProps = {
	children?: any;
	product: Product | undefined;
};

export type ProductEditFormProps = {
	children?: any;
	product: Product | undefined;
};

export type ProductImageDisplayProps = {
	images: Image[];
};

export type SearchProps = {
	value: string;
	set: React.Dispatch<React.SetStateAction<string>>;
};
