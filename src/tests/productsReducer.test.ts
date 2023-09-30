import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { createStore } from "../redux/store";
import server from "./testServer";

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

describe("productReducer async thunk", () => {
	test("Should fetch all products from the API", async () => {
		await store.dispatch(fetchAllProducts());
		expect(store.getState().productsReducer.products.length).toBe(3);
	});
});
