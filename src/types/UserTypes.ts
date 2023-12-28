export type User = {
	id: string;
	email: string;
	password: string;
	name: string;
	role: UserRole;
	avatar: string;
};

export type UserCreate = {
	email: string;
	password: string;
	name: string;
	role: UserRole;
	avatar: string;
};

export enum UserRole {
	Normal = "Normal",
	Admin = "Admin",
}

export type UserCredentials = {
	email: string;
	password: string;
};

export type UserReducerState = {
	status: "idle" | "loading";
	currentUser: User | undefined;
	accessToken: string;
	error: string | undefined;
};
