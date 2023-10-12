import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";

export default function ProfilePage() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);

	return (
		<Container component="main" sx={{ mt:"5rem" }}>
			<Box
				display="flex"
				flexDirection="column"
				alignItems="center"
				maxWidth="md"
				margin="auto"
			>
				<Typography variant="h3">{currentUser?.name}</Typography>
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
		</Container>
	);
}
