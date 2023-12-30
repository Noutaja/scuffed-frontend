export type CategoriesReducerState = {
	categories: Category[];
	status: "idle" | "loading";
	error: string | undefined;
};

export type Category = {
	id: string;
	name: string;
	url: string;
};

export type CategoryCreate = {
	category: {
		name: string;
		url: string;
	};
	accessToken: string;
};

export type CategoryUpdate = {
	category: {
		name: string;
		url: string;
	};
	accessToken: string;
	id: string;
};
