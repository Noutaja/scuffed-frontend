import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProfileWithToken } from "../redux/reducers/usersReducer";
import HeaderProfile from "./HeaderProfile";
import HeaderCart from "./HeaderCart";

export default function Header() {
	const dispatch = useAppDispatch();
	const accessToken = useAppSelector((state) => state.usersReducer.accessToken);
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);

	useEffect(() => {
		if (accessToken !== "" && !currentUser) {
			dispatch(fetchProfileWithToken(accessToken));
		}
	}, [dispatch]);
	return (
		<Box component="header" height={50}>
			<Box display="flex" flexDirection="row" justifyContent="space-between">
				<Box
					component="nav"
					display="flex"
					flexDirection="row"
					maxWidth="md"
				>
					<Stack component="ul">
						<Link to={""}>
							<Typography>Home</Typography>
						</Link>
					</Stack>
				</Box>
				<Box display="flex" flexDirection="row" justifyContent="space-between">
					<HeaderCart />
					<HeaderProfile />
				</Box>
			</Box>
		</Box>
	);
}
