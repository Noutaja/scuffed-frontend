import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { AddressItemProps } from "../types/Props";

export default function AddressItem(props: AddressItemProps) {
	const a = props.address;
	return (
		<Box>
			<Paper>
				<Typography>{a.street}</Typography>
				<Typography>
					{a.city} {a.zipcode}
				</Typography>
				<Typography>{a.country}</Typography>
			</Paper>
		</Box>
	);
}
