import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { Product } from "../types/Types";
import { Box, Stack, Typography } from "@mui/material";
import ProductItem from "../components/ProductItem";

export default function MainPage() {
	const products: Product[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<Box>
			<Stack direction={"row"} flexWrap={"wrap"} useFlexGap gap={"1em"}>
				{products.map((p) => (
					<ProductItem product={p} key={p.id}/>
				))}
			</Stack>
		</Box>
	);
}
