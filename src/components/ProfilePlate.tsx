import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";

export default function ProfilePlate() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function logoutButtonClicked(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		dispatch(logoutUser());
	}

	function loginButtonClicked(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		navigate("login");
	}
	return (
		<Box>
			{currentUser ? (
				<Box display="flex" flexDirection="row">
					<Typography>{currentUser.name}</Typography>
					<Button variant="contained" onClick={logoutButtonClicked}>
						Logout
					</Button>
				</Box>
			) : (
				<Button variant="contained" onClick={loginButtonClicked}>
					Login
				</Button>
			)}
		</Box>
	);
}
