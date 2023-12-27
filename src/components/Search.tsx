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
import { useEffect } from "react";

import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	setCategoryFilter,
	setPaginPerPage,
	setSearchText,
	setSortBy,
	setSortDirection,
} from "../redux/reducers/uiReducer";
import { UiSortBy, UiSortDirection, UserRole } from "../types/Types";
import ProductEditModal from "./ProductEditModal";
import { fetchAllCategories } from "../redux/reducers/categoriesReducer";

export default function Search() {
	const categories = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const uiReducer = useAppSelector((state) => state.uiReducer);
	const searchText = uiReducer.searchText;
	const paginPerPage = uiReducer.paginPerPage;
	const sortSearchBy = uiReducer.sortBy;
	const sortDirection = uiReducer.sortDirection;
	const categoryFilter = uiReducer.categoryFilter;
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, [dispatch]);

	return (
		<Box>
			<Box display="flex" flexWrap="wrap" alignItems="center">
				<TextField
					select
					label="Category"
					value={categoryFilter}
					onChange={(e) =>
						dispatch(setCategoryFilter(e.target.value))
					}
					sx={{ m: 1, minWidth: 120 }}
					size="small"
				>
					<MenuItem value={""}>All Categories</MenuItem>
					{categories.map((c) => (
						<MenuItem key={c.id} value={c.id}>
							{c.name}
						</MenuItem>
					))}
				</TextField>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="sort-category">Sort by</InputLabel>
					<Select
						autoWidth
						defaultValue="price"
						value={sortSearchBy}
						onChange={(e) =>
							dispatch(setSortBy(e.target.value as UiSortBy))
						}
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
							dispatch(
								setSortDirection(
									e.target.value as UiSortDirection
								)
							)
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
						onChange={(e) =>
							dispatch(setPaginPerPage(e.target.value as number))
						}
					>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
						<MenuItem value={50}>50</MenuItem>
					</Select>
				</FormControl>
				{currentUser && currentUser.role === UserRole.Admin && (
					<ProductEditModal product={undefined}>
						ADD PRODUCT
					</ProductEditModal>
				)}
			</Box>

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
