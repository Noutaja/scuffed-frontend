import React from "react";
import { ProductItemProps } from "../types/Props";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";

export default function ProductInfo(props: ProductItemProps) {
	const p = props.product;
	return (
		<Box component="section" display="flex" justifyContent="space-around" width="50%">
			<Card>
				<CardContent>
					<Typography variant="h3">{p.title}</Typography>
					<Typography variant="h5">{p.description}</Typography>
				</CardContent>
			</Card>
		</Box>
	);
}
