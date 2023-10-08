import { Box, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../hooks/useAppSelector";
import { Link } from "react-router-dom";

export default function HeaderCart() {
	const items = useAppSelector((state) => state.cartReducer.items);
	let totalCost = items.reduce((x, y) => y.product.price * y.amount + x, 0);
	return (
		<Link to="cart">
			<Box display="flex" flexDirection="row" justifyContent="space-between">
				<Typography>{totalCost}€</Typography>
				<ShoppingCartIcon />
			</Box>
		</Link>
	);
}
