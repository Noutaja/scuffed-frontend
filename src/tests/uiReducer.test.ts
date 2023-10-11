import uiReducer, {
	setPaginPage,
	setPaginPerPage,
	setSearchText,
	setSortBy,
	setSortDirection,
} from "../redux/reducers/uiReducer";
import { createStore } from "../redux/store";
import { UiReducerState } from "../types/Types";

let store = createStore();

beforeEach(() => {
	store = createStore();
});

describe("uiReducer", () => {
	test("Should have an empty initial state", () => {
		expect(store.getState().uiReducer.searchText).toBe("");
		expect(store.getState().uiReducer.sortBy).toBe("price");
		expect(store.getState().uiReducer.sortDirection).toBe("asc");
		expect(store.getState().uiReducer.paginPage).toBe(1);
		expect(store.getState().uiReducer.paginPerPage).toBe(20);
	});

	test("Should change search text", () => {
		const state: UiReducerState = {
			searchText: "",
			sortBy: "price",
			sortDirection: "asc",
			paginPage: 1,
			paginPerPage: 20,
		};
		const test = "test";
		const ui = uiReducer(state, setSearchText(test));
		expect(ui.searchText).toBe(test);
		expect(ui.paginPage).toBe(1);
	});

	test("Should change sort criteria", () => {
		const state: UiReducerState = {
			searchText: "",
			sortBy: "price",
			sortDirection: "asc",
			paginPage: 1,
			paginPerPage: 20,
		};
		//Can't test "properly" because sorting by price is the only supported sorting criteria
		const test = "price";
		const ui = uiReducer(state, setSortBy(test));
		expect(ui.sortBy).toBe(test);
	});

	test("Should change sort direction", () => {
		const state: UiReducerState = {
			searchText: "",
			sortBy: "price",
			sortDirection: "asc",
			paginPage: 1,
			paginPerPage: 20,
		};
		const test = "desc";
		const ui = uiReducer(state, setSortDirection(test));
		expect(ui.sortDirection).toBe(test);
	});

	test("Should change pagination page", () => {
		const state: UiReducerState = {
			searchText: "",
			sortBy: "price",
			sortDirection: "asc",
			paginPage: 1,
			paginPerPage: 20,
		};
		const test = 2;
		const ui = uiReducer(state, setPaginPage(test));
		expect(ui.paginPage).toBe(test);
	});

	test("Should change pagination items per page", () => {
		const state: UiReducerState = {
			searchText: "",
			sortBy: "price",
			sortDirection: "asc",
			paginPage: 1,
			paginPerPage: 20,
		};
		const test = 10;
		const ui = uiReducer(state, setPaginPerPage(test));
		expect(ui.paginPerPage).toBe(test);
	});
});
