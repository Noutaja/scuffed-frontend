import { Box, Container } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams } from "react-router-dom";

import { Product } from "../types/Types";
import ProductInfo from "../components/ProductInfo";
import ProductImageDisplay from "../components/ProductImageDisplay";

export default function SingleProductPage() {
	const { productID } = useParams();
	const id = Number(productID); //Can I convert the parameter string to a number easier?

	const product: Product | undefined = useAppSelector((state) => {
		return state.productsReducer.products.find((p) => p.id === id);
	});

	return (
		<Container component="main" maxWidth="lg">
			<Box display="flex">
        {product && <ProductInfo product={product}/>}
        {product && <ProductImageDisplay images={product.images}/>}
      </Box>
		</Container>
	);
}
