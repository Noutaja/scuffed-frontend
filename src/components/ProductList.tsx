import { Container, Typography } from "@mui/material";
import React, { memo } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Product } from "../types/Types";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductItem from "./ProductItem";
import useDebounce from "../helpers/debounce";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";

function ProductList() {
	const searchText: string = useAppSelector((state) => state.uiReducer.searchText);
	const sortSearchBy: string = useAppSelector((state) => state.uiReducer.sortBy);
	const products: Product[] = useAppSelector(
		(state) => state.productsReducer.products.filter((p) => p.title.toLowerCase().includes(searchText))
	);
	const status = useAppSelector((state) => state.productsReducer.status);
	const dispatch = useAppDispatch();
	
	useDebounce(() => dispatch(fetchAllProducts()), null, 1000);
	return (
		<Container>
			{status === "idle" && products[0] && (
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ lg: 10 }}>
					{products.map((p) => (
						<Grid xs={6} sm={4} md={3} lg={2} key={p.id}>
							<ProductItem product={p} />
						</Grid>
					))}
				</Grid>
			)}
			{status === "idle" && !products.length && <Typography>Nothing found!</Typography>}
			{status === "loading" && <Typography>Loading...</Typography>}
		</Container>
	);
}

export default memo(ProductList)