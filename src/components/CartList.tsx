import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import CartItemComponent from "./CartItemComponent";
import { emptyCart } from "../redux/reducers/cartReducer";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function CartList() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const dispatch = useAppDispatch();
	let totalPrice = cartItems.reduce(
		(prev, curr) => curr.amount * curr.product.price + prev,
		0
	);
	return (
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
				<Typography variant="h5">
					Total Price: {totalPrice} €
				</Typography>
				<Tooltip title="Empty Shopping Cart">
					<Button
						variant="contained"
						onClick={() => dispatch(emptyCart())}
					>
						<DeleteIcon />
					</Button>
				</Tooltip>
				{!currentUser ? (
					<Typography>Login to checkout</Typography>
				) : (
					<UnstyledLink to="/checkout">
						<Button variant="contained">CHECKOUT</Button>
					</UnstyledLink>
				)}
			</Box>
		</Box>
	);
}
