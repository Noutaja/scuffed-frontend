import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAppSelector } from "../hooks/useAppSelector";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function HeaderCart() {
	const items = useAppSelector((state) => state.cartReducer.items);
	let totalItems = items.reduce((prev, curr) => curr.amount + prev, 0);
	return (
		<Box
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
			alignItems="center"
		>
			<Badge
				badgeContent={totalItems}
				overlap="circular"
				anchorOrigin={{ horizontal: "left", vertical: "top" }}
				color="warning"
			>
				<Tooltip title="Shopping Cart">
					<UnstyledLink to="/cart">
						<IconButton>
							<ShoppingCartIcon />
						</IconButton>
					</UnstyledLink>
				</Tooltip>
			</Badge>
		</Box>
	);
}
