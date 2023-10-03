import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

import { ProductItemProps } from "../types/Props";
import { Link } from "react-router-dom";

export default function ProductItem(props: ProductItemProps) {
	const p = props.product;
	return (
		<Card sx={{ maxWidth: 200, maxHeight: 325 }}>
			<Link to={`products/${p.id}`}>
				<CardMedia sx={{ height: 150 }} image={p.images[0]} title={p.title} />
			</Link>

			<CardContent>
				<Link to={`products/${p.id}`}>
					<Typography>{p.title}</Typography>
				</Link>
				<Typography>{p.price}€</Typography>
				<Typography>{p.category.name}</Typography>
			</CardContent>
		</Card>
	);
}
