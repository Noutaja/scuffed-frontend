import React from "react";
import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import { CartItem } from "../types/Types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addOneItem, removeOneItem } from "../redux/reducers/cartReducer";

export default function CartItemInfo(props: { i: CartItem }) {
	const dispatch = useAppDispatch();
	const i = props.i;
	return (
		<Box display="flex">
			<Box sx={{ margin: "auto" }}>
				<Typography>Total:</Typography>
				<Typography variant="h5" textAlign="center">
					{i.amount * i.product.price} €
				</Typography>
			</Box>
			<Stack sx={{ marginLeft: "0.5em" }} justifyContent="space-between">
				<Tooltip title="Increase amount">
					<Button onClick={() => dispatch(addOneItem(i.product))}>
						<AddIcon sx={{ color: "black" }} />
					</Button>
				</Tooltip>

				<Typography textAlign="center">
					<Inventory2Icon />
					{i.amount}
				</Typography>
				<Tooltip title="Decrease amount">
					<Button onClick={() => dispatch(removeOneItem(i.product.id))}>
						<RemoveIcon sx={{ color: "black" }} />
					</Button>
				</Tooltip>
			</Stack>
		</Box>
	);
}
