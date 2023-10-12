import { Box, Container, Paper } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams } from "react-router-dom";

import { Product } from "../types/Types";
import ProductInfo from "../components/ProductInfo";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useEffect } from "react";
import { fetchOneProduct } from "../redux/reducers/productsReducer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SingleProductPage() {
	const { productID } = useParams();

	const product: Product | undefined = useAppSelector((state) => {
		return state.productsReducer.products.find(
			(p) => p.id === Number(productID)
		);
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchOneProduct(Number(productID)));
	}, [dispatch]);

	return (
		<Container component="main" maxWidth="lg" sx={{ mt: "4rem"}}>
			<Box display="flex" flexDirection="row" flexWrap="wrap" gap={5}>
				{product && <ProductInfo product={product} />}
				<Paper component="section" sx={{ flex: 1, flexBasis: 300 }}>
					<Box display="flex" flexDirection="column" padding={1}>
						<Carousel
							infiniteLoop
							autoPlay
							showStatus={false}
							showArrows={false}
						>
							{product &&
								product.images.map((img) => (
									<img src={img} key={img} alt={product.title} />
								))}
						</Carousel>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
}
