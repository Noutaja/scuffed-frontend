import { Container, Pagination, Typography } from "@mui/material";
import React, { memo, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Product, UiSortBy } from "../types/Types";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductItem from "./ProductItem";
import useDebounce from "../helpers/debounce";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { setPaginPage } from "../redux/reducers/uiReducer";

function ProductList() {
	const searchText: string = useAppSelector(
		(state) => state.uiReducer.searchText
	);
	const sortSearchBy: UiSortBy = useAppSelector(
		(state) => state.uiReducer.sortBy
	);
	const products: Product[] = useAppSelector((state) =>
		state.productsReducer.products
			.filter((p) => p.title.toLowerCase().includes(searchText))
			.sort((a, b) => a[sortSearchBy] - b[sortSearchBy])
	);
	const status = useAppSelector((state) => state.productsReducer.status);
	const dispatch = useAppDispatch();
	
	const paginPage = useAppSelector((state) => state.uiReducer.paginPage);
	const paginPerPage = useAppSelector((state) => state.uiReducer.paginPerPage);
	const paginEnd = paginPage * paginPerPage;
	const displayProducts = products.slice(
		(paginPage - 1) * paginPerPage,
		paginEnd
	);
	

	useDebounce(() => dispatch(fetchAllProducts()), null, 1000);
	return (
		<Container>
			{status === "idle" && products[0] && (
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ lg: 10 }}>
					{displayProducts.map((p) => (
						<Grid xs={6} sm={4} md={3} lg={2} key={p.id}>
							<ProductItem product={p} />
						</Grid>
					))}
				</Grid>
			)}
			{status === "idle" && !products.length && (
				<Typography>Nothing found!</Typography>
			)}
			{status === "loading" && <Typography>Loading...</Typography>}
			<Pagination
				page={paginPage}
				onChange={(e, v) => dispatch(setPaginPage(v))}
				count={Math.floor(products.length / 20)}
				defaultPage={1}
			/>
		</Container>
	);
}

export default ProductList;
