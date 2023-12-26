import cartReducer, {
	addOneItem,
	emptyCart,
	removeOneItem,
} from "../redux/reducers/cartReducer";
import { createStore } from "../redux/store";
import { CartItem, CartReducerState, Product } from "../types/Types";

const products: Product[] = [
	{
		id: "id1",
		title: "Licensed Frozen Salad",
		price: 686,
		description:
			"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
		images: [{ id: "id1", url: "https://i.imgur.com/CCnU4YX.jpeg" }],
		category: {
			id: "id1",
			name: "Electronics",
			image: "https://i.imgur.com/uDpzwEk.jpeg",
		},
	},
	{
		id: "id2",
		title: "Oriental Rubber Towels",
		price: 563,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [{ id: "id2", url: "https://i.imgur.com/GwylUgV.jpeg" }],
		category: {
			id: "id5",
			name: "Others",
			image: "https://i.imgur.com/Dm2pPfd.jpeg",
		},
	},
	{
		id: "id3",
		title: "Elegant Plastic Shirt",
		price: 944,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [{ id: "id1", url: "https://i.imgur.com/uDpzwEk.jpeg" }],
		category: {
			id: "id3",
			name: "Hola que hace",
			image: "https://i.imgur.com/zQwsC2m.jpeg",
		},
	},
];
const cartItems: CartItem[] = [];
for (let i = 0; i < products.length; i++) {
	cartItems.push({ product: products[i], amount: i + 1 });
}

let store = createStore();

beforeEach(() => {
	store = createStore();
});

describe("cartReducer", () => {
	test("Should have an empty initial state", () => {
		expect(store.getState().cartReducer.items.length).toBe(0);
		expect(store.getState().cartReducer.status).toBe("idle");
		expect(store.getState().cartReducer.error).toBe(undefined);
	});

	test("Should empty to initial state initial state", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, emptyCart());
		expect(cart.items.length).toBe(0);
		expect(cart.status).toBe("idle");
		expect(cart.error).toBe(undefined);
	});

	test("Adding should create a new cartItem", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: [],
		};
		const cart = cartReducer(state, addOneItem(cartItems[0].product));
		expect(cart.items.length).toBe(1);
		expect(cart.items[0].amount).toBe(1);
		expect(cart.items[0]).toMatchObject(cartItems[0]);
	});

	test("Adding should only increase amount when cartItem exists", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, addOneItem(cartItems[0].product));
		expect(cart.items.length).toBe(3);
		expect(cart.items[0].amount).toBe(2);
	});

	test("Removing should reduce amount by one", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, removeOneItem("id2"));
		expect(cart.items[1].amount).toBe(1);
	});

	test("Reducing amount to 0 should remove the item", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, removeOneItem("id1"));
		expect(cart.items.length).toBe(2);
	});
});
