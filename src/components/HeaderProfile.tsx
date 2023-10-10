import { Avatar, Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function HeaderProfile() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	function logoutButtonClicked(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		dispatch(logoutUser());
		navigate("/");
	}

	function loginButtonClicked(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		navigate("login");
	}
	return (
		<Box display="flex" flexDirection="row" alignItems="center">
			{currentUser ? (
				<Box display="flex" flexDirection="row" alignItems="center">
					<UnstyledLink to="profile">
						<Box display="flex" flexDirection="row" alignItems="center">
							<Avatar src={currentUser.avatar} />
							<Typography>{currentUser.name}</Typography>
						</Box>
					</UnstyledLink>
					<Button color="inherit" onClick={logoutButtonClicked}>
						Logout
					</Button>
				</Box>
			) : (
				<Button color="inherit" onClick={loginButtonClicked}>
					Login
				</Button>
			)}
		</Box>
	);
}
