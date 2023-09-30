import { rest } from "msw";
import { setupServer } from "msw/node";
import { Product } from "../types/Types";

const products: Product[] = [
	{
		id: 2,
		title: "Licensed Frozen Salad",
		price: 686,
		description:
			"The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients",
		images: [
			"https://i.imgur.com/CCnU4YX.jpeg",
			"https://i.imgur.com/JANnz25.jpeg",
			"https://i.imgur.com/ioc7lwM.jpeg",
		],
		creationAt: "2023-09-29T23:39:06.000Z",
		updatedAt: "2023-09-29T23:39:06.000Z",
		category: {
			id: 2,
			name: "Electronics",
			image: "https://i.imgur.com/uDpzwEk.jpeg",
			creationAt: "2023-09-29T23:39:06.000Z",
			updatedAt: "2023-09-29T23:39:06.000Z",
		},
	},
	{
		id: 3,
		title: "Oriental Rubber Towels",
		price: 563,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [
			"https://i.imgur.com/GwylUgV.jpeg",
			"https://i.imgur.com/G45P8tI.jpeg",
			"https://i.imgur.com/Y5gHJMd.jpeg",
		],
		creationAt: "2023-09-29T23:39:06.000Z",
		updatedAt: "2023-09-29T23:39:06.000Z",
		category: {
			id: 5,
			name: "Others",
			image: "https://i.imgur.com/Dm2pPfd.jpeg",
			creationAt: "2023-09-29T23:39:06.000Z",
			updatedAt: "2023-09-29T23:39:06.000Z",
		},
	},
	{
		id: 8,
		title: "Elegant Plastic Shirt",
		price: 944,
		description:
			"The slim & simple Maple Gaming Keyboard from Dev Byte comes with a sleek body and 7- Color RGB LED Back-lighting for smart functionality",
		images: [
			"https://i.imgur.com/uDpzwEk.jpeg",
			"https://i.imgur.com/OLKMwgP.jpeg",
			"https://i.imgur.com/O1LUkwy.jpeg",
		],
		creationAt: "2023-09-29T23:39:06.000Z",
		updatedAt: "2023-09-29T23:39:06.000Z",
		category: {
			id: 3,
			name: "Hola que hace",
			image: "https://i.imgur.com/zQwsC2m.jpeg",
			creationAt: "2023-09-29T23:39:06.000Z",
			updatedAt: "2023-09-30T02:17:47.000Z",
		},
	},
];
const url= "https://api.escuelajs.co/api/v1";

export const handlers = [
	rest.get(`${url}/products`, (req, res, ctx) => {
		return res(ctx.json(products));
	}),
];

const server = setupServer(...handlers);
export default server;