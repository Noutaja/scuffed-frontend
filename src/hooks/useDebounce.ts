import { useEffect } from "react";

const useDebounce = (func: Function, dependency: any, timer: number) => {
	useEffect(() => {
		const timeoutID = setTimeout(() => func(), timer);
		return () => clearTimeout(timeoutID);
	}, [dependency]);
};

export default useDebounce;
