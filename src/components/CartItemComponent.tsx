import React from "react";
import { Paper } from "@mui/material";

import CartProductInfo from "./CartProductInfo";
import CartItemInfo from "./CartItemInfo";
import { CartItem } from "../types/Types";

export default function CartItemComponent(props: { i: CartItem }) {
	return (
		<Paper
			sx={{
				display: "flex",
				flexDirection: "row",
				height: "fit-content",
				justifyContent: "space-between",
				margin: 1,
				p: 1,
			}}
		>
			<CartProductInfo p={props.i.product} />
			<CartItemInfo i={props.i} />
		</Paper>
	);
}
