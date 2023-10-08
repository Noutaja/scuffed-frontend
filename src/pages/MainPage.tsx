import React, { useState } from "react";
import { Container } from "@mui/material";
import ProductList from "../components/ProductList";
import Search from "../components/Search";

export default function MainPage() {
const [searchText, setSearchText] = useState("");

	return (
		<Container component="main">
			<Search/>
			<ProductList/>
		</Container>
	);
}
