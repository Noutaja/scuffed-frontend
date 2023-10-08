import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

import { useAppSelector } from "../hooks/useAppSelector";

export default function CartPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);

	return <Box component="main">
		{
				<Stack>
					{cartItems.map((i) => (<Box display="flex" flexDirection="row" key={i.product.id}>
						<Box component="img" src={i.product.images[0]} sx={{maxHeight: 100}}></Box>
						<Typography>{i.product.title} {i.product.price}€ Total: {i.product.price * i.amount}€</Typography>
					</Box>))}
				</Stack>
			}
	</Box>;
}
