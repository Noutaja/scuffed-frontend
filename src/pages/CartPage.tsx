import React from "react";
import { Box, Button, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/useAppSelector";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";
import CartList from "../components/CartList";

export default function CartPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);

	return (
		<Box component="main" sx={{ mt: { xs: "5rem", sm: "5rem" } }}>
			{!cartItems.length ? (
				<Box display="flex" flexDirection="column" alignItems="center">
					<Typography variant="h3">
						Cart empty! Go add products to it
					</Typography>
					<UnstyledLink to="/">
						<Button variant="contained">Back to products</Button>
					</UnstyledLink>
				</Box>
			) : (
				<CartList/>
			)}
		</Box>
	);
}
