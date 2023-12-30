import { rest } from "msw";
import { setupServer } from "msw/node";

import { Category } from "../types/CategoryTypes";

export const categories: Category[] = [
	{
		id: "id1",
		name: "Books",
		url: "https://i.imgur.com/lauPy0D.jpeg",
	},
	{
		id: "id2",
		name: "Computers",
		url: "https://i.imgur.com/zjLVS8N.jpeg",
	},
	{
		id: "id3",
		name: "Clothes",
		url: "https://i.imgur.com/xYO6uDv.jpeg",
	},
];
const url = "http://localhost:5157/api/v1/";

export const handlers = [
	rest.get(`${url}categories`, (req, res, ctx) => {
		return res(ctx.json(categories));
	}),
];

const server = setupServer(...handlers);
export default server;
