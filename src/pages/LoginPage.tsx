import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setUsersError } from "../redux/reducers/usersReducer";

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
		dispatch(setUsersError(undefined));
	}, []);

	return (
		<Box
			component="main"
			display="flex"
			alignItems="center"
			flexDirection="column"
			sx={{ mt:"5rem"}}
		>
			<LoginForm />
		</Box>
	);
}
