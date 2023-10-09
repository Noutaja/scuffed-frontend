import { Container, Typography } from "@mui/material";
import React, { memo, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Product } from "../types/Types";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import ProductItem from "./ProductItem";

function ProductList() {
	const products: Product[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const status = useAppSelector((state) => state.productsReducer.status);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);
	return (
		<Container>
			{status === "idle" && products.length && (
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ lg: 10 }}>
					{products.map((p) => (
						<Grid xs={6} sm={4} md={3} lg={2} key={p.id}>
							<ProductItem product={p} />
						</Grid>
					))}
				</Grid>
			)}
			{status === "loading" && <Typography>Loading...</Typography>}
		</Container>
	);
}

export default memo(ProductList)