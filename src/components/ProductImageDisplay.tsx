import React, { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";

import { ProductImageDisplayProps } from "../types/Props";

export default function ProductImageDisplay(props: ProductImageDisplayProps) {
	const images = props.images;
	const [activeImage, setActiveImage] = useState(0);

	return (
		<Paper component="section" sx={{ flex: 1, flexBasis: 300 }}>
			<Box display="flex" flexDirection="column" padding={1}>
				<Box
					component="img"
					src={images[activeImage].url}
					sx={{ width: "100%", height: "auto" }}
				/>
				{
					<Stack
						flexDirection="row"
						justifyContent="space-evenly"
						flexWrap="wrap"
						gap={1}
						margin={1}
					>
						{images.map((img, index) => (
							<Box
								component="img"
								src={img.url}
								sx={{ maxWidth: 150 }}
								key={img.id}
								onClick={() => setActiveImage(index)}
							/>
						))}
					</Stack>
				}
			</Box>
		</Paper>
	);
}
