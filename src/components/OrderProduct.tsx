import React from "react";
import { OrderProductItemProps } from "../types/Props";
import { Box, Paper, Typography } from "@mui/material";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function OrderProduct(props: OrderProductItemProps) {
	const op = props.orderProduct;
	return (
		<Box>
			<Paper>
				<UnstyledLink to={`/products/${op.product.id}`}>
					<Box
						component="img"
						src={op.product.images[0].url}
						sx={{ width: 80 }}
					/>
					<Box display={"inline-block"}>
						<Typography>{op.product.title}</Typography>
						<Typography>
							{op.price}€ / Total price {op.price * op.amount}€
						</Typography>
						<Typography>Amount: {op.amount}</Typography>
					</Box>
				</UnstyledLink>
			</Paper>
		</Box>
	);
}
