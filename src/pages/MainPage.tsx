import React, { useEffect} from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllProducts } from "../redux/reducers/productsReducer";
import { Product } from "../types/Types";

export default function MainPage() {
	const products: Product[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const dispatch = useAppDispatch();
  console.log(products)

	useEffect(() => {
		dispatch(fetchAllProducts());
	}, [dispatch]);

	return (
		<div>
			{products.map((p) => (
				<div key={p.id}>
					<p>{p.title}</p>
					<p>{p.price}</p>
				</div>
			))}
		</div>
	);
}
