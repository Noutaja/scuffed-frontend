import {
	fetchProfileWithToken,
	authWithCredentials,
	loginWithCredentials,
	logoutUser,
	createUser,
} from "../redux/reducers/usersReducer";
import { createStore } from "../redux/store";
import { User, UserCreate } from "../types/Types";
import server, { dummyAuthToken, users } from "./usersTestServer";

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

describe("userReducer", () => {
	test("Should  logout user", () => {
		store.dispatch(logoutUser());
		expect(store.getState().usersReducer.accessToken).toBe("");
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
		expect(localStorage.getItem("access-token")).toBe("");
	});
});

describe("userReducer async thunk", () => {
	test("Should fetch an authentication token", async () => {
		await store.dispatch(
			authWithCredentials({ email: "john@mail.com", password: "changeme" })
		);
		expect(store.getState().usersReducer.accessToken).toBe(
			dummyAuthToken + "_1"
		);
	});

	test("Should not fetch a token with incorrect credentials", async () => {
		await store.dispatch(
			authWithCredentials({ email: "wrongn@mail.com", password: "no" })
		);
		expect(store.getState().usersReducer.accessToken).toBe("");
	});

	test("Should fetch the correct profile", async () => {
		await store.dispatch(fetchProfileWithToken(dummyAuthToken + "_1"));
		expect(store.getState().usersReducer.currentUser).toMatchObject(users[0]);
	});

	test("Should not fetch a profile with incorrect auth token", async () => {
		await store.dispatch(fetchProfileWithToken("wrong-token"));
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
	});

	test("Should login with credentials", async () => {
		await store.dispatch(
			loginWithCredentials({ email: "john@mail.com", password: "changeme" })
		);
		expect(store.getState().usersReducer.currentUser).toMatchObject(users[0]);
	});

	test("Should not login with wrong credentials", async () => {
		await store.dispatch(
			loginWithCredentials({ email: "wrong@mail.com", password: "no" })
		);
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
	});

	test("Should create a new user", async () => {
		const newUser: UserCreate = {
			email: "niko@gmail.com",
			password: "1234",
			name: "Nikolas",
			avatar: "https://i.imgur.com/5mPmJYO.jpeg",
		};
		const fullNewUser = {
			email: "niko@gmail.com",
			password: "1234",
			name: "Nikolas",
			avatar: "https://i.imgur.com/5mPmJYO.jpeg",
			role: "customer",
			id: 4,
		};
		const returnedUser = await store.dispatch(createUser(newUser));
		expect(returnedUser.payload).toMatchObject(fullNewUser);
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			fullNewUser
		);
	});
});
