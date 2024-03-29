import React from "react";
import { Container } from "@mui/material";

import ProductList from "../components/ProductList";
import Search from "../components/Search";

export default function MainPage() {
	return (
		<Container component="main" sx={{ mt:"5rem"}}>
			<Search />
			<ProductList />
		</Container>
	);
}
