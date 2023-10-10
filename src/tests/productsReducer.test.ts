import {
	createProduct,
	deleteOneProduct,
	fetchAllProducts,
	fetchOneProduct,
	fetchProductsWithPagination,
	updateProduct,
} from "../redux/reducers/productsReducer";
import { createStore } from "../redux/store";
import { Product, ProductCreate, ProductUpdate } from "../types/Types";
import server from "./productTestServer";

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
		await store.dispatch(fetchOneProduct(1));
		expect(store.getState().productsReducer.products.length).toBe(1);
		expect(store.getState().productsReducer.products[0].id).toBe(1);
	});

	test("Should delete one product by id", async () => {
		const result = await store.dispatch(deleteOneProduct(1));
		expect(result.payload).toBe(1);
	});

	test("Should create one product", async () => {
		const newProduct: ProductCreate = {
			title: "Licensed Frozen Salad",
			price: 686,
			description:
				"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
			images: [
				"https://i.imgur.com/CCnU4YX.jpeg",
				"https://i.imgur.com/JANnz25.jpeg",
				"https://i.imgur.com/ioc7lwM.jpeg",
			],
			category: 1,
		};
		await store.dispatch(createProduct(newProduct));
		expect(store.getState().productsReducer.products.length).toBe(1);
	});

	test("Should update product", async () => {
		const updateP: Product = {
			id: 1,
			title: "Frozen Salad",
			price: 686,
			description:
				"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
			images: [
				"https://i.imgur.com/CCnU4YX.jpeg",
				"https://i.imgur.com/JANnz25.jpeg",
				"https://i.imgur.com/ioc7lwM.jpeg",
			],
			category: {
				id: 2,
				name: "Electronics",
				image: "https://i.imgur.com/uDpzwEk.jpeg",
				creationAt: "2023-09-29T23:39:06.000Z",
				updatedAt: "2023-09-29T23:39:06.000Z",
			},
		};
		const action = await store.dispatch(updateProduct(updateP));
		const testProduct = {
			id: 1,
			title: "Frozen Salad",
			price: 686,
			description:
				"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
			images: [
				"https://i.imgur.com/CCnU4YX.jpeg",
				"https://i.imgur.com/JANnz25.jpeg",
				"https://i.imgur.com/ioc7lwM.jpeg",
			],
			category: {
				id: 2,
				name: "Electronics",
				image: "https://i.imgur.com/uDpzwEk.jpeg",
				creationAt: "2023-09-29T23:39:06.000Z",
				updatedAt: "2023-09-29T23:39:06.000Z",
			},
		};
		expect(action.payload).toMatchObject(testProduct);
	});
});
