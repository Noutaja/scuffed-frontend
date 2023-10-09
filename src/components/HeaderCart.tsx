import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../hooks/useAppSelector";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function HeaderCart() {
	const items = useAppSelector((state) => state.cartReducer.items);
	let totalCost = items.reduce(
		(prev, curr) => curr.product.price * curr.amount + prev,
		0
	);
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Typography>{totalCost}€</Typography>
			<Tooltip title="Shopping Cart">
				<UnstyledLink to="cart">
					<IconButton>
						<ShoppingCartIcon />
					</IconButton>
				</UnstyledLink>
			</Tooltip>
		</Box>
	);
}
