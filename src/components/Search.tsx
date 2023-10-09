import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setSearchText } from "../redux/reducers/uiReducer";

export default function Search() {
	const searchText = useAppSelector((state) => state.uiReducer.searchText);
	const sortSearchBy: string = useAppSelector((state) => state.uiReducer.sortBy);
	const dispatch = useAppDispatch();
	return (
		<Box>
			<FormControl>
				<InputLabel id="sort-category">Sort by:</InputLabel>
				<Select autoWidth defaultValue={sortSearchBy}>
					<MenuItem value={sortSearchBy}>Name</MenuItem>
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
					value={searchText}
					onChange={(e) => {
						dispatch(setSearchText(e.target.value));
					}}
				/>
			</Box>
		</Box>
	);
}
