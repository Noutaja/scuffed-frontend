import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import { createStore } from "../redux/store";
import server, { categories } from "./categoriesTestServer";

let store = createStore();

beforeEach(() => {
	store = createStore();
});

beforeAll(() => {
	server.listen();
});
afterEach(() => {
	server.resetHandlers();
});
afterAll(() => {
	server.close();
});

describe("productReducer", () => {
	test("Should have an empty initial state", () => {
		expect(store.getState().productsReducer.products.length).toBe(0);
		expect(store.getState().productsReducer.status).toBe("idle");
		expect(store.getState().productsReducer.error).toBe(undefined);
	});
});

describe("productReducer async thunk", () => {
	test("Should fetch all products from the API", async () => {
		await store.dispatch(fetchAllCategories());
		expect(store.getState().categoriesReducer.categories.length).toBe(
			categories.length
		);
	});
});
