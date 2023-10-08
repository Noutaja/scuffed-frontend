import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/usersReducer";
import { Link, useNavigate } from "react-router-dom";

export default function HeaderProfile() {
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
					<Link to="profile">
						<Box display="flex" flexDirection="row" alignItems="center">
							<Box
								component="img"
								src={currentUser.avatar}
								maxWidth={40}
								maxHeight="100%"
							></Box>
							<Typography>{currentUser.name}</Typography>
						</Box>
					</Link>
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
