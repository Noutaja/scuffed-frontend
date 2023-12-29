import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CartProductInfo from "./CartProductInfo";
import { OrderProductListProps } from "../types/Props";

export default function OrderProductList(props: OrderProductListProps) {
	return (
		<Stack maxWidth="sm">
			{props.cartItems.map((i) => (
				<Paper
					key={i.product.id}
					sx={{
						display: "flex",
						flexDirection: "row",
						height: "fit-content",
						justifyContent: "space-between",
						margin: 1,
						p: 1,
					}}
				>
					<CartProductInfo p={i.product} />
					<Box sx={{ margin: "auto" }}>
						<Typography>Total:</Typography>
						<Typography variant="h5" textAlign="center">
							{i.amount * i.product.price} €
						</Typography>
					</Box>
				</Paper>
			))}
		</Stack>
	);
}
