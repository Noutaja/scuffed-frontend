import { Box, Button, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";

export default function UserProfileInfo() {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			maxWidth="md"
			margin="auto"
		>
			<Typography variant="h3">
				{currentUser?.firstName} {currentUser?.lastName}
			</Typography>
			<Box
				component="img"
				src={currentUser?.avatar}
				sx={{ borderRadius: "50%", width: 150 }}
			/>
			<Box padding={1}>
				<Typography>Avatar URL: {currentUser?.avatar}</Typography>
				<Typography>Email: {currentUser?.email}</Typography>
			</Box>
			<Tooltip title="Not implemented">
				<Button variant="contained">EDIT PROFILE</Button>
			</Tooltip>
		</Box>
	);
}
