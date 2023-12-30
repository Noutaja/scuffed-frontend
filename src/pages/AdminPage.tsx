import { Box, Button, Typography } from "@mui/material";
import React from "react";
import AdminDataGrid from "../components/AdminDataGrid";

export default function AdminPage() {
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
