import React from "react";
import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";

import { ProductItemProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addOneItem } from "../redux/reducers/cartReducer";

export default function ProductInfo(props: ProductItemProps) {
	const dispatch = useAppDispatch();
	const p = props.product;
	return (
		<Box component="section" display="flex" justifyContent="space-around">
			<Card>
				<CardContent>
					<Typography variant="h3">{p.title}</Typography>
					<Typography variant="h5">{p.description}</Typography>
				</CardContent>
				<CardActions>
					<Button variant="contained" onClick={() => dispatch(addOneItem(p))}>ADD TO CART</Button>
				</CardActions>
			</Card>
		</Box>
	);
}
