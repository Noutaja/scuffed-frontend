import { Badge, Box, IconButton, Tooltip, useTheme } from "@mui/material";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useAppSelector } from "../hooks/useAppSelector";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function HeaderCart() {
	const theme = useTheme()
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
				color="secondary"
			>
				<Tooltip title="Shopping Cart">
					<UnstyledLink to="/cart">
						<IconButton>
							<ShoppingCartIcon sx={{color: theme.palette.primary.contrastText}}/>
						</IconButton>
					</UnstyledLink>
				</Tooltip>
			</Badge>
		</Box>
	);
}
