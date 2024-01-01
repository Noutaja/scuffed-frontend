import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import AdminDataGrid from "../components/AdminDataGrid";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserRole } from "../types/UserTypes";

export default function AdminPage() {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);

	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser || currentUser.role !== UserRole.Admin) {
			navigate("/");
		}
	}, [currentUser]);

	return (
		<Box component="main" sx={{ mt: { xs: "5rem", sm: "5rem" } }}>
			<Typography sx={{ display: { sm: "block", md: "none" } }}>
				Too little horizontal space. Please turn your device sideways
			</Typography>
			<Box sx={{ display: { xs: "none", md: "block" } }}>
				<AdminDataGrid />
			</Box>
		</Box>
	);
}
