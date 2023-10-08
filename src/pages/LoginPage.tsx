import { Box } from "@mui/material";
import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);

	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser]);

	return (
		<Box
			component="main"
			display="flex"
			alignItems="center"
			flexDirection="column"
		>
			<LoginForm />
		</Box>
	);
}
