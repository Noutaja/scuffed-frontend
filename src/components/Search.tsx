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
import {
	setPaginPerPage,
	setSearchText,
	setSortBy,
	setSortDirection,
} from "../redux/reducers/uiReducer";
import { UiSortBy, UiSortDirection } from "../types/Types";

export default function Search() {
	const searchText = useAppSelector((state) => state.uiReducer.searchText);
	const paginPerPage = useAppSelector((state) => state.uiReducer.paginPerPage);
	const sortSearchBy: string = useAppSelector(
		(state) => state.uiReducer.sortBy
	);
	const sortDirection = useAppSelector(
		(state) => state.uiReducer.sortDirection
	);
	const dispatch = useAppDispatch();
	return (
		<Box>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="sort-category">Sort by</InputLabel>
				<Select
					autoWidth
					defaultValue="price"
					value={sortSearchBy}
					onChange={(e) => dispatch(setSortBy(e.target.value as UiSortBy))}
				>
					<MenuItem value="price">Price</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="sort-direction">Sort direction</InputLabel>
				<Select
					autoWidth
					defaultValue="asc"
					value={sortDirection}
					onChange={(e) =>
						dispatch(setSortDirection(e.target.value as UiSortDirection))
					}
				>
					<MenuItem value="asc">Ascending</MenuItem>
					<MenuItem value="desc">Descending</MenuItem>
				</Select>
			</FormControl>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
				<InputLabel id="pagin-per-page">Show results</InputLabel>
				<Select
					autoWidth
					defaultValue={20}
					value={paginPerPage}
					onChange={(e) => dispatch(setPaginPerPage(e.target.value as number))}
				>
					<MenuItem value={10}>10</MenuItem>
					<MenuItem value={20}>20</MenuItem>
					<MenuItem value={50}>50</MenuItem>
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
