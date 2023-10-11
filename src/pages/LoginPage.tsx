import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setError } from "../redux/reducers/usersReducer";

export default function LoginPage() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const dispatch = useAppDispatch();

	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser]);

	useEffect(() => {
		dispatch(setError(undefined));
	}, []);

	return (
		<Box
			component="main"
			display="flex"
			alignItems="center"
			flexDirection="column"
			marginTop="4rem"
		>
			<LoginForm />
		</Box>
	);
}
