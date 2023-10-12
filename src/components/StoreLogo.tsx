import { Box, Typography } from "@mui/material";
import React from "react";

export default function StoreLogo() {
	return (
    <Box>
      <Typography variant="h4" sx={{ position: "relative" }}>
				Webstore
			</Typography>
      <Typography
					color="error.main"
          variant="h5"
					sx={{
						fontWeight: "bold",
						position: "absolute",
						top: "5px",
						left: "60px",
						transform: "rotate(-20deg)",
						zIndex: -1,
					}}
				>
					Scuffed
				</Typography>
    </Box>
			
	);
}
