import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import React from "react";

import { ProductItemProps } from "../types/Props";
import { Link } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import store from "../redux/store";
import { addOneItem } from "../redux/reducers/cartReducer";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function ProductItem(props: ProductItemProps) {
	const p = props.product;
	return (
		<Card sx={{ height: 325 }}>
			<Link to={`products/${p.id}`}>
				<CardMedia
					sx={{ height: 150 }}
					image={p.images[0].url}
					title={p.title}
				/>
			</Link>

			<CardContent>
				<UnstyledLink to={`products/${p.id}`}>
					<Typography>{p.title}</Typography>
				</UnstyledLink>
				<Typography>{p.price}€</Typography>
				<Typography>{p.category.name}</Typography>
			</CardContent>
			<CardActions>
				<Button onClick={() => store.dispatch(addOneItem(p))}>
					<ShoppingCart />
				</Button>
			</CardActions>
		</Card>
	);
}
