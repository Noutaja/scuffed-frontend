import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppSelector } from "../hooks/useAppSelector";
import UserProfileInfo from "../components/UserProfileInfo";
import AddressPanel from "../components/AddressPanel";
import OrdersPanel from "../components/OrdersPanel";

export default function ProfilePage() {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const accessToken = useAppSelector(
		(state) => state.usersReducer.accessToken
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);

	return (
		<Box component="main" sx={{ mt: "5rem" }} display={"flex"}>
			<Box sx={{ flex: 1 }}>
				<UserProfileInfo />
				<AddressPanel accessToken={accessToken} />
			</Box>
			<Box sx={{ flex: 1 }}>
				<OrdersPanel accessToken={accessToken} />
			</Box>
		</Box>
	);
}
