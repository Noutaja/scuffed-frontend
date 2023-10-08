import { Box,  TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
	const [searchText, setSearchText] = useState("");


	return (
		<Box
			display="flex"
			justifyContent="flex-start"
			marginBottom="1rem"
			marginTop="1rem"
		>
			<SearchIcon />
			<TextField
				fullWidth
				placeholder="Search"
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
		</Box>
	);
}