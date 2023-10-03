import { ItemWithId } from "../types/Types";

function addIdsToList<T>(list: T[]) {
	let newList: ItemWithId<T>[] = [];
	for (let i = 0; i < list.length; i++) {
		newList.push({ item: list[i], id: i });
	}
	return newList;
}

export default addIdsToList;
