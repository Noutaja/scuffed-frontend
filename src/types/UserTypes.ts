export type User = {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	role: UserRole;
	avatar: string;
};

export type UserCreate = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	avatar: string;
};

export type UserUpdate = {
	user: {
		firstName?: string;
		lastName?: string;
		avatar?: string;
	};
	accessToken: string;
	id: string;
};

export type UserRoleUpdate = {
	role: UserRole;
	accessToken: string;
	id: string;
};

export type UserGet = {
	accessToken: string;
};

export type UserDelete = {
	accessToken: string;
	id: string;
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
	users: User[];
	status: "idle" | "loading";
	currentUser: User | undefined;
	accessToken: string;
	error: string | undefined;
};
