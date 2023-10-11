import { Box, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
	return (
		<Box component="footer" marginTop="auto" display="flex" justifyContent="center" sx={{backgroundColor: "rgb(25, 118, 210)", color:"white"}}>
			<Typography variant="h5" sx={{margin:"auto"}}>© 2023 Noutaja</Typography>
		</Box>
	);
}
