import { RestContext, rest } from "msw";
import { setupServer } from "msw/node";

import {
	Category,
	Product,
	ProductCreate,
	ProductUpdate,
} from "../types/Types";

const products: Product[] = [
	{
		id: "id1",
		title: "Licensed Frozen Salad",
		price: 686,
		description:
			"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
		images: [{ id: "id1", url: "https://i.imgur.com/CCnU4YX.jpeg" }],
		category: {
			id: "id2",
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
		images: [{ id: "id1", url: "https://i.imgur.com/GwylUgV.jpeg" }],
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
const categories: Category[] = [
	{
		id: "id1",
		name: "Books",
		image: "https://i.imgur.com/lauPy0D.jpeg",
	},
	{
		id: "id2",
		name: "Computers",
		image: "https://i.imgur.com/zjLVS8N.jpeg",
	},
	{
		id: "id3",
		name: "Clothes",
		image: "https://i.imgur.com/xYO6uDv.jpeg",
	},
];
const url = "https://api.escuelajs.co/api/v1";

export const handlers = [
	rest.get(`${url}/products`, (req, res, ctx) => {
		return res(ctx.json(products));
	}),

	rest.get(`${url}/products/:id`, (req, res, ctx) => {
		const product = products.find((p) => p.id === req.params.id);
		return res(ctx.json(product));
	}),

	rest.delete(`${url}/products/:id`, (req, res, ctx) => {
		const index = products.findIndex((p) => p.id === req.params.id);
		if (index <= 0) {
			return res(ctx.json(true));
		}
		return res(
			ctx.json({
				path: `/api/v1/products/${req.params.id}`,
				timestamp: Date.now(),
				name: "EntityNotFoundError",
				message: `Could not find any entity of type \"Product\" matching: {\n    \"relations\": [\n        \"category\"\n    ],\n    \"where\": {\n        \"id\": ${req.params.id}\n    }\n}`,
			})
		);
	}),

	rest.post(`${url}/products/`, async (req, res, ctx) => {
		const input: ProductCreate = await req.json();
		const category = categories.find(
			(c) => c.id === input.product.categoryId
		);

		if (input.product.price <= 0) {
			badRequest(ctx);
			return;
		}
		if (input.product.images.length < 1) {
			badRequest(ctx);
			return;
		}

		if (category) {
			const newProduct: Product = {
				id: "id" + products.length + 1,
				images: input.product.images,
				title: input.product.title,
				description: input.product.description,
				category: category,
				price: input.product.price,
			};
			return res(ctx.json(newProduct));
		}
		badRequest(ctx);
		return;
	}),

	rest.put(`${url}/products/:id`, async (req, res, ctx) => {
		const input: ProductUpdate = await req.json();
		const index = products.findIndex((p) => p.id === req.params.id);

		if (input.product.price && input.product.price <= 0) {
			badRequest(ctx);
			return;
		}
		if (
			input.product.price &&
			input.product.images &&
			input.product.images.length < 1
		) {
			badRequest(ctx);
			return;
		}

		if (index >= 0) {
			return res(
				ctx.json({
					...products[index],
					...input,
				})
			);
		}

		badRequest(ctx);
		return;
	}),
];

function badRequest(ctx: RestContext) {
	ctx.status(400);
	ctx.json({
		message: [
			"price must be a positive number",
			"images must contain at least 1 elements",
			"each value in images must be a URL address",
			"images must be an array",
		],
		error: "Bad Request",
		statusCode: 400,
	});
}

const server = setupServer(...handlers);
export default server;
