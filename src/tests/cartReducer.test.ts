import cartReducer, {
	addOneItem,
	emptyCart,
	getAllItems,
	removeOneItem,
} from "../redux/reducers/cartReducer";
import { createStore } from "../redux/store";
import { CartItem, CartReducerState, Product } from "../types/Types";

const products: Product[] = [
	{
		id: 1,
		title: "Licensed Frozen Salad",
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
		},
	},
	{
		id: 2,
		title: "Oriental Rubber Towels",
		price: 563,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [
			"https://i.imgur.com/GwylUgV.jpeg",
			"https://i.imgur.com/G45P8tI.jpeg",
			"https://i.imgur.com/Y5gHJMd.jpeg",
		],
		category: {
			id: 5,
			name: "Others",
			image: "https://i.imgur.com/Dm2pPfd.jpeg",
		},
	},
	{
		id: 3,
		title: "Elegant Plastic Shirt",
		price: 944,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [
			"https://i.imgur.com/uDpzwEk.jpeg",
			"https://i.imgur.com/OLKMwgP.jpeg",
			"https://i.imgur.com/O1LUkwy.jpeg",
		],
		category: {
			id: 3,
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

	test("Should get all items", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, getAllItems());
		expect(cart.items.length).toBe(3);
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
		const cart = cartReducer(state, removeOneItem(2));
		expect(cart.items[1].amount).toBe(1);
	});

	test("Reducing amount to 0 should remove the item", () => {
		const state: CartReducerState = {
			status: "idle",
			error: undefined,
			items: cartItems,
		};
		const cart = cartReducer(state, removeOneItem(1));
		expect(cart.items.length).toBe(2);
	});
});
