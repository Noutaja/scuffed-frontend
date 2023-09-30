import { Box, Typography } from "@mui/material";
import React from "react";

import { ProductItemProps } from "../types/Props";
import { Link } from "react-router-dom";

export default function ProductItem(props: ProductItemProps) {
	const p = props.product;
	return (
		<Box
			maxWidth={300}
			maxHeight={400}
			display={"flex"}
			flexDirection={"column"}
		>
			<Link to={`products/${p.id}`}>
				<Box component="img" src={p.images[0]} width={"100%"} sx={{ objectFit: "cover" }} />
			</Link>
			<Box>
				<Link to={`products/${p.id}`}><Typography>{p.title}</Typography></Link>
				<Typography>{p.price}€</Typography>
				<Typography>{p.category.name}</Typography>
			</Box>
		</Box>
	);
}
