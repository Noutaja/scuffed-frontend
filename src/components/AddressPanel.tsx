import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useAppSelector } from "../hooks/useAppSelector";
import { Address } from "../types/AddressTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllAddresses } from "../redux/reducers/addressesReducer";
import AddressItem from "./AddressItem";
import AddressAddForm from "./AddressAddForm";
import { User } from "../types/UserTypes";

type AddressPanelProps = {
	accessToken: string;
	currentUser: User | undefined;
};

export default function AddressPanel(props: AddressPanelProps) {
	const addresses: Address[] = useAppSelector(
		(state) => state.addressesReducer.addresses
	);
	const [isAdding, setIsAdding] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchAllAddresses({
				ownerID: props.currentUser?.id!,
				accessToken: props.accessToken,
			})
		);
	}, []);

	function onAddingDone() {
		setIsAdding(false);
	}

	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			maxWidth="md"
			margin="auto"
			padding={1}
		>
			<Typography variant="h4">Addresses</Typography>
			<Stack>
				{addresses
					.filter((address) => !address.hidden)
					.map((a: Address) => (
						<Box p={2} key={a.id}>
							<AddressItem
								address={a}
								deleteVisible={true}
								accessToken={props.accessToken}
							/>
						</Box>
					))}
			</Stack>
			{isAdding ? (
				<AddressAddForm
					currentUser={props.currentUser}
					accessToken={props.accessToken}
					onFinish={onAddingDone}
				/>
			) : (
				<Button
					variant="contained"
					onClick={() => setIsAdding(!isAdding)}
				>
					Add
				</Button>
			)}
		</Box>
	);
}
