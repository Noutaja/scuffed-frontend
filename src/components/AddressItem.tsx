import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";

import { Address, AddressUpdate } from "../types/AddressTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	deleteOneAddress,
	updateAddress,
} from "../redux/reducers/addressesReducer";
type AddressItemProps = {
	address: Address;
	deleteVisible?: boolean;
	accessToken?: string;
};

export default function AddressItem(props: AddressItemProps) {
	const dispatch = useAppDispatch();
	const a = props.address;

	function handleDelete() {
		let updatedAddress: AddressUpdate = {
			address: {
				hidden: true,
			},
			accessToken: props.accessToken!,
			id: a.id,
		};
		let tmp = dispatch(updateAddress(updatedAddress));
	}
	return (
		<Box>
			<Paper
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					padding: "0.5rem",
				}}
			>
				<Box>
					<Typography>{a.street}</Typography>
					<Typography>
						{a.city} {a.zipcode}
					</Typography>
					<Typography>{a.country}</Typography>
				</Box>
				{props.deleteVisible && (
					<Tooltip title="Remove Address">
						<Button variant="contained" onClick={handleDelete}>
							<DeleteIcon />
						</Button>
					</Tooltip>
				)}
			</Paper>
		</Box>
	);
}
