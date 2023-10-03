import { Box, Container } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams } from "react-router-dom";

import { Product } from "../types/Types";
import ProductInfo from "../components/ProductInfo";
import ProductImageDisplay from "../components/ProductImageDisplay";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchOneProduct } from "../redux/reducers/productsReducer";

export default function SingleProductPage() {
	const { productID } = useParams();

	const product: Product | undefined = useAppSelector((state) => {
		return state.productsReducer.products.find(
			(p) => p.id === Number(productID)
		);
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchOneProduct(Number(productID)));
	}, [dispatch]);

	return (
		<Container component="main" maxWidth="lg">
			<Box display="flex">
				{product && <ProductInfo product={product} />}
				{product && <ProductImageDisplay images={product.images} />}
			</Box>
		</Container>
	);
}
