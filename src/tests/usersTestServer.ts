import { rest } from "msw";
import { setupServer } from "msw/node";

import { User, UserCreate, UserRole } from "../types/UserTypes";

const url = "https://api.escuelajs.co/api/v1";
export const users: User[] = [
	{
		id: "id1",
		email: "john@mail.com",
		password: "changeme",
		name: "Jhon",
		role: UserRole.Normal,
		avatar: "https://i.imgur.com/DumuKkD.jpeg",
	},
	{
		id: "id2",
		email: "maria@mail.com",
		password: "12345",
		name: "Maria",
		role: UserRole.Normal,
		avatar: "https://i.imgur.com/00qWleT.jpeg",
	},
	{
		id: "id3",
		email: "admin@mail.com",
		password: "admin123",
		name: "Admin",
		role: UserRole.Admin,
		avatar: "https://i.imgur.com/5mPmJYO.jpeg",
	},
];
export const dummyAuthToken = "auth-me";

export const handlers = [
	rest.post(`${url}/auth/login`, async (req, res, ctx) => {
		const { email, password } = await req.json();
		const match = users.find(
			(u) => u.email === email && u.password === password
		);
		if (match) {
			const token = dummyAuthToken + "_" + match.id;
			return res(ctx.json({ access_token: token }));
		}
		ctx.status(401);
		return res(ctx.text("Cannot authenticate user"));
	}),

	rest.get(
		"https://api.escuelajs.co/api/v1/auth/profile",
		(req, res, ctx) => {
			const token = req.headers.get("authorization")?.split(" ")[1];
			const authToken = token?.split("_")[0];
			const id = token?.split("_")[1];
			const match = users.find((u) => u.id === id);
			if (authToken === dummyAuthToken && match) {
				return res(ctx.json(match));
			}
			ctx.status(401);
			return res(ctx.text("Cannot fetch profile"));
		}
	),

	rest.post(
		"https://api.escuelajs.co/api/v1/users/",
		async (req, res, ctx) => {
			const input: UserCreate = await req.json();
			const newUser: User = {
				email: input.email,
				password: input.password,
				name: input.name,
				avatar: input.avatar,
				role: input.role,
				id: "id" + users.length + 1,
			};
			users.push(newUser);
			return res(ctx.json(newUser));
		}
	),
];

const server = setupServer(...handlers);
export default server;
