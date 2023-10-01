import { Product } from "./Types";

export type ProductItemProps = {
  product: Product;
}

export type ProductInfoProps = { //Should I just reuse the ProductItemProps? These could later on have different requirements..
  product: Product;
}

export type ProductImageDisplayProps = {
  images: string[];
}