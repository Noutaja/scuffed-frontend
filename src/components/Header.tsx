import {
	AppBar,
	Box,
	Button,
	Stack,
	Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchProfileWithToken } from "../redux/reducers/usersReducer";
import HeaderProfile from "./HeaderProfile";
import HeaderCart from "./HeaderCart";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";
import ProductEditModal from "./ProductEditModal";

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
							<Box>
								<Typography variant="h4" sx={{ position: "relative" }}>
									Webstore
									<Typography
										color="error.main"
										variant="h5"
										sx={{
											fontWeight:"bold",
											position: "absolute",
											top: "-10px",
											left: "10px",
											transform: "rotate(-20deg)",
											zIndex:-1
										}}>
										Scuffed
									</Typography>
								</Typography>
							</Box>
						</UnstyledLink>
						{currentUser && currentUser.role === "admin" && (
							<ProductEditModal product={undefined}>
								ADD PRODUCT
							</ProductEditModal>
						)}
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
