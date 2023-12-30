import { Address } from "./AddressTypes";
import { OrderProduct } from "./OrderTypes";
import { Product } from "./ProductTypes";
import { CartItem, Image } from "./Types";
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
	onClose: () => void;
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
	currentUser: User | undefined;
};

export type AddressAddFormProps = {
	accessToken: string;
	currentUser: User | undefined;
};

export type OrdersPanelProps = {
	accessToken: string;
	currentUser: User | undefined;
};

export type OrderProductItemProps = {
	orderProduct: OrderProduct;
};

export type OrderProductListProps = {
	cartItems: CartItem[];
};

export type AddressItemProps = {
	address: Address;
};

export type ProductDataGridProps = {
	accessToken: string;
};
