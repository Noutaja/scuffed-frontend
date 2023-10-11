import React from "react";
import {
	Box,
	Button,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppSelector } from "../hooks/useAppSelector";
import CartItemComponent from "../components/CartItemComponent";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { emptyCart } from "../redux/reducers/cartReducer";

export default function CartPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);
	const dispatch = useAppDispatch();
	let totalPrice = cartItems.reduce(
		(prev, curr) => curr.amount * curr.product.price + prev,
		0
	);

	return (
		<Box component="main" marginTop="4rem">
			<Box
				component="section"
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<Typography variant="h3">Shopping cart</Typography>
				{
					<Stack maxWidth="sm">
						{cartItems.map((i) => (
							<CartItemComponent key={i.product.id} i={i} />
						))}
					</Stack>
				}
				<Box
					maxWidth="sm"
					display="flex"
					justifyContent="space-between"
					gap={5}
					margin={1}
				>
					<Typography variant="h5">Total Price: {totalPrice} €</Typography>
					<Tooltip title="Empty Shopping Cart">
						<Button variant="contained" onClick={() => dispatch(emptyCart())}>
							<DeleteIcon />
						</Button>
					</Tooltip>
					<Tooltip title="Not implemented">
						<Button variant="contained">CHECKOUT</Button>
					</Tooltip>
				</Box>
			</Box>
		</Box>
	);
}
