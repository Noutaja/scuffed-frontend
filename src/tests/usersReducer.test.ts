import {
	fetchProfileWithToken,
	authWithCredentials,
	loginWithCredentials,
	logoutUser,
	createUser,
} from "../redux/reducers/usersReducer";
import { createStore } from "../redux/store";
import { UserCreate, UserRole } from "../types/UserTypes";
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
	test("Should have an empty initial state", () => {
		expect(store.getState().usersReducer.accessToken).toBe("");
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
		expect(store.getState().usersReducer.status).toBe("idle");
		expect(store.getState().usersReducer.error).toBe(undefined);
	});
	test("Should logout user", () => {
		store.dispatch(logoutUser());
		expect(store.getState().usersReducer.accessToken).toBe("");
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
		expect(localStorage.getItem("access-token")).toBe("");
	});
});

describe("userReducer async thunk", () => {
	test("Should fetch an authentication token", async () => {
		await store.dispatch(
			authWithCredentials({
				email: "john@mail.com",
				password: "changeme",
			})
		);
		expect(store.getState().usersReducer.accessToken).toBe(
			dummyAuthToken + "_id1"
		);
	});

	test("Should not fetch a token with incorrect credentials", async () => {
		await store.dispatch(
			authWithCredentials({ email: "wrongn@mail.com", password: "no" })
		);
		expect(store.getState().usersReducer.accessToken).toBe("");
	});

	test("Should fetch the correct profile", async () => {
		await store.dispatch(fetchProfileWithToken(dummyAuthToken + "_id1"));
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			users[0]
		);
	});

	test("Should not fetch a profile with incorrect auth token", async () => {
		await store.dispatch(fetchProfileWithToken("wrong-token"));
		expect(store.getState().usersReducer.currentUser).toBe(undefined);
	});

	test("Should login with credentials", async () => {
		await store.dispatch(
			loginWithCredentials({
				email: "john@mail.com",
				password: "changeme",
			})
		);
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			users[0]
		);
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
			firstName: "niko",
			lastName: "Doe",
			avatar: "https://i.pravatar.cc/300",
		};
		const fullNewUser = {
			email: "niko@gmail.com",
			password: "1234",
			firstName: "niko",
			lastName: "Doe",
			avatar: "https://i.pravatar.cc/300",
			role: UserRole.Normal,
			id: "id4",
		};
		const returnedUser = await store.dispatch(createUser(newUser));
		expect(returnedUser.payload).toMatchObject(fullNewUser);
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			fullNewUser
		);
	});
});
