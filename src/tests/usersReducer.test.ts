import { fetchProfileWithToken, authWithCredentials, loginWithCredentials } from "../redux/reducers/usersReducer";
import { createStore } from "../redux/store";
import { User } from "../types/Types";
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

describe("userReducer async thunk", () => {
	test("Should fetch an authentication token", async () => {
		await store.dispatch(
			authWithCredentials({ email: "john@mail.com", password: "changeme" })
		);
		expect(store.getState().usersReducer.accessToken).toBe(dummyAuthToken+"_1")
	});

  test("Should fetch the correct profile", async () => {
		await store.dispatch(fetchProfileWithToken(dummyAuthToken + "_1"));
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			users[0]
		);
	});

	test("Should login with credentials", async () => {
		await store.dispatch(
			loginWithCredentials({ email: "john@mail.com", password: "changeme" })
		);
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			users[0]
		);
	});
});
