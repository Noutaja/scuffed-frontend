import { Box, Pagination, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

import { UiSortBy, UiSortDirection } from "../types/Types";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductItem from "./ProductItem";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { setPaginPage } from "../redux/reducers/uiReducer";
import { searchSorting } from "../helpers/searchSorting";
import { Product } from "../types/ProductTypes";

function ProductList() {
	const uiReducer = useAppSelector((state) => state.uiReducer);
	const searchText: string = uiReducer.searchText;
	const sortSearchBy: UiSortBy = uiReducer.sortBy;
	const sortDirection: UiSortDirection = uiReducer.sortDirection;
	const categoryFilter: string = uiReducer.categoryFilter;

	const products: Product[] = useAppSelector((state) =>
		state.productsReducer.products
			.filter((p) => p.title.toLowerCase().includes(searchText))
			.filter((p) => {
				if (categoryFilter === "") return true;
				return p.category.id === categoryFilter;
			})
			.sort(searchSorting(sortDirection, sortSearchBy))
	);
	const status = useAppSelector((state) => state.productsReducer.status);
	const dispatch = useAppDispatch();

	const paginPage = uiReducer.paginPage;
	const paginPerPage = uiReducer.paginPerPage;
	const paginEnd = paginPage * paginPerPage;
	const displayProducts = products.slice(
		(paginPage - 1) * paginPerPage,
		paginEnd
	);

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, []);

	return (
		<Box display="flex" flexDirection="column" justifyItems="center">
			<Pagination
				page={paginPage}
				onChange={(e, v) => dispatch(setPaginPage(v))}
				count={Math.floor(products.length / 20)}
				defaultPage={1}
				sx={{ margin: 1, marginLeft: "auto", marginRight: "auto" }}
			/>
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
			{status === "loading" && (
				<Box margin="auto">
					<CircularProgress />
					<Typography>Loading...</Typography>
				</Box>
			)}
			<Pagination
				page={paginPage}
				onChange={(e, v) => dispatch(setPaginPage(v))}
				count={Math.floor(products.length / 20)}
				defaultPage={1}
				sx={{
					marginTop: "1rem",
					marginLeft: "auto",
					marginRight: "auto",
				}}
			/>
		</Box>
	);
}

export default ProductList;
