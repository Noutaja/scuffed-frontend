import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { SearchProps } from "../types/Props";

export default function Search(props: SearchProps) {
	return (
		<Box>
			<FormControl>
				<InputLabel id="sort-category">Sort by:</InputLabel>
				<Select autoWidth defaultValue="Title">
					<MenuItem value="Title">Name</MenuItem>
				</Select>
			</FormControl>
			<Box
				display="flex"
				justifyContent="flex-start"
				marginBottom="1rem"
				marginTop="1rem"
				alignItems="center"
			>
				<SearchIcon />
				<TextField
					fullWidth
					placeholder="Search"
					value={props.value}
					onChange={(e) => {
						props.set(e.target.value);
					}}
				/>
			</Box>
		</Box>
	);
}
