import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";

import { useAppSelector } from "../hooks/useAppSelector";
import store from "../redux/store";
import { removeOneItem } from "../redux/reducers/cartReducer";

export default function CartPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);

	return (
		<Box component="main" marginTop="4rem">
			{
				<Stack>
					{cartItems.map((i) => (
						<Box display="flex" flexDirection="row" key={i.product.id}>
							<Box
								component="img"
								src={i.product.images[0]}
								sx={{ maxHeight: 100 }}
							></Box>
							<Typography>
								{i.product.title} {i.product.price}€ Total:{" "}
								{i.product.price * i.amount}€
							</Typography>
							<Button
								variant="contained"
								onClick={() => store.dispatch(removeOneItem(i.product.id))}
							>
								X
							</Button>
						</Box>
					))}
				</Stack>
			}
		</Box>
	);
}
