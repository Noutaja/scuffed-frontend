import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const navigate = useNavigate();

	/* useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]); */

	return (
		<Container>
			<Typography variant="h3">User Profile</Typography>
			<Box component="img" src={currentUser?.avatar} />
			<Typography>Name: {currentUser?.name}</Typography>
			<Typography>Avatar URL: {currentUser?.avatar}</Typography>
			<Typography>Email: {currentUser?.email}</Typography>
			<Button variant="contained">EDIT PROFILE</Button>
		</Container>
	);
}
