import { Address } from "./AddressTypes";
import { OrderProduct } from "./OrderTypes";
import { Product } from "./ProductTypes";
import { Image } from "./Types";
import { User } from "./UserTypes";

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

export type AddressPanelProps = {
	accessToken: string;
};

export type OrdersPanelProps = {
	accessToken: string;
};

export type OrderProductItemProps = {
	orderProduct: OrderProduct;
};

export type AddressItemProps = {
	address: Address;
};
