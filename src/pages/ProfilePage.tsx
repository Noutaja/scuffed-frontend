import { Box, Button, Container, Tooltip, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";
import UserProfileInfo from "../components/UserProfileInfo";

export default function ProfilePage() {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);

	return (
		<Container component="main" sx={{ mt: "5rem" }}>
			<UserProfileInfo />
		</Container>
	);
}
