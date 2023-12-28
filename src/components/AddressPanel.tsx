import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { Address } from "../types/AddressTypes";
import { AddressPanelProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllAddresses } from "../redux/reducers/addressesReducer";
import AddressItem from "./AddressItem";

export default function AddressPanel(props: AddressPanelProps) {
	const addresses: Address[] = useAppSelector(
		(state) => state.addressesReducer.addresses
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllAddresses(props.accessToken));
	}, []);

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			maxWidth="md"
			margin="auto"
		>
			<Typography variant="h4">Addresses</Typography>
			<Stack spacing={2}>
				{addresses.map((a: Address) => (
					<AddressItem address={a} key={a.id} />
				))}
			</Stack>
		</Box>
	);
}
