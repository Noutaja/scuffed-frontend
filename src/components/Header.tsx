import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { authWithCredentials, fetchProfileWithToken } from "../redux/reducers/usersReducer";
import ProfilePlate from "./ProfilePlate";

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
		<Box
			component="nav"
			display="flex"
			flexDirection="row"
			justifyContent="space-between"
		>
			<Stack component="ul">
				<Link to={""}>
					<Typography>Home</Typography>
				</Link>
			</Stack>
			<Box>
				<ProfilePlate />
			</Box>
		</Box>
	);
}
