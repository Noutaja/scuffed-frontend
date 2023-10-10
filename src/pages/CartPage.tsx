import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { useAppSelector } from "../hooks/useAppSelector";
import store from "../redux/store";
import { addOneItem, removeOneItem } from "../redux/reducers/cartReducer";
import CartItemComponent from "../components/CartItemComponent";

export default function CartPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);

	return (
		<Box
			component="main"
			marginTop="4rem"
			width="100%"
			display="flex"
			justifyContent="center"
		>
			{
				<Stack maxWidth="sm">
					{cartItems.map((i) => (
						<CartItemComponent i={i}/>
					))}
				</Stack>
			}
		</Box>
	);
}
