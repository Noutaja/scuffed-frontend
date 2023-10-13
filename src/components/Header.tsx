import {
	AppBar,
	Box,
	Stack,
} from "@mui/material";
import React, { useEffect } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProfileWithToken } from "../redux/reducers/usersReducer";
import HeaderProfile from "./HeaderProfile";
import HeaderCart from "./HeaderCart";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";
import StoreLogo from "./StoreLogo";

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
		<AppBar component="header">
			<Box display="flex" flexDirection="row" justifyContent="space-between">
				<Box component="nav">
					<Stack
						component="ul"
						display="flex"
						flexDirection="row"
						maxWidth="md"
					>
						<UnstyledLink to={"/"}>
							<StoreLogo/>
						</UnstyledLink>
					</Stack>
				</Box>
				<Box display="flex" flexDirection="row" justifyContent="space-between">
					<HeaderCart />
					<HeaderProfile />
				</Box>
			</Box>
		</AppBar>
	);
}
