import { Product, UiSortBy, UiSortDirection } from "../types/Types";

export function searchSorting(direction: UiSortDirection, sortBy: UiSortBy) {
	if (direction === "asc") {
		return (a: Product, b: Product) => {
			return a[sortBy] - b[sortBy];
		};
	} else if (direction === "desc") {
		return (a: Product, b: Product) => {
			return b[sortBy] - a[sortBy];
		};
	}
}
