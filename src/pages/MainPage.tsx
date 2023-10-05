import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { Product } from "../types/Types";
import { Container } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
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
		<Container>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
			>
				{products.map((p) => (
					<Grid xs={6} sm={4} md={3} lg={2} key={p.id}>
						<ProductItem product={p} />
					</Grid>
				))}
			</Grid>
		</Container>
	);
}
