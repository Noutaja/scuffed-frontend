import {
	createProduct,
	deleteOneProduct,
	fetchAllProducts,
	fetchOneProduct,
	updateProduct,
} from "../redux/reducers/productsReducer";
import { createStore } from "../redux/store";
import { ProductCreate, ProductUpdate } from "../types/ProductTypes";
import server, { dummyAuthToken } from "./productTestServer";

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
		await store.dispatch(fetchAllProducts());
		expect(store.getState().productsReducer.products.length).toBe(3);
	});

	test("Should fetch one product by id", async () => {
		await store.dispatch(fetchOneProduct("id1"));
		expect(store.getState().productsReducer.products.length).toBe(1);
		expect(store.getState().productsReducer.products[0].id).toBe("id1");
	});

	test("Should delete one product by id", async () => {
		const result = await store.dispatch(
			deleteOneProduct({ id: "id1", accessToken: dummyAuthToken })
		);
		expect(result.payload).toBe("id1");
	});

	test("Should create one product", async () => {
		const newProduct: ProductCreate = {
			product: {
				title: "Licensed Frozen Salad",
				price: 686,
				description:
					"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
				images: [
					{ id: "id1", url: "https://i.imgur.com/CCnU4YX.jpeg" },
				],
				categoryId: "id1",
			},
			accessToken: dummyAuthToken,
		};
		await store.dispatch(createProduct(newProduct));
		expect(store.getState().productsReducer.products.length).toBe(1);
	});

	test("Should update product", async () => {
		const updateP: ProductUpdate = {
			product: {
				price: 687,
			},
			id: "id1",
			accessToken: "dummy-token",
		};
		const action = await store.dispatch(updateProduct(updateP));
		const testProduct = {
			id: "id1",
			title: "Licensed Frozen Salad",
			price: 687,
			description:
				"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
			images: [{ id: "id1", url: "https://i.imgur.com/CCnU4YX.jpeg" }],
			category: {
				id: "id2",
				name: "Electronics",
				url: "https://i.imgur.com/uDpzwEk.jpeg",
			},
		};
		expect(action.payload).toMatchObject(testProduct);
	});
});
