import { authenticateWithToken, loginWithCredentials } from "../redux/reducers/usersReducer";
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
	test("Should login with correct credentials", async () => {
		await store.dispatch(
			loginWithCredentials({ email: "john@mail.com", password: "changeme" })
		);
		expect(store.getState().usersReducer.currentUser).toMatchObject(users[0]);
	});

  test("Should authenticate with correct token", async () => {
		await store.dispatch(authenticateWithToken(dummyAuthToken + "_0"));
		expect(store.getState().usersReducer.currentUser).toMatchObject(
			users[0]
		);
	});
});
