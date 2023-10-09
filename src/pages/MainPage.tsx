import React, { useState } from "react";
import { Container } from "@mui/material";

import ProductList from "../components/ProductList";
import Search from "../components/Search";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import useDebounce from "../helpers/debounce";

export default function MainPage() {
	const [searchText, setSearchText] = useState("");
	const dispatch = useAppDispatch();

	useDebounce(() => dispatch(fetchAllProducts()), searchText, 500);

	return (
		<Container component="main" sx={{ marginTop: "4rem" }}>
			<Search value={searchText} set={setSearchText} />
			<ProductList />
		</Container>
	);
}
