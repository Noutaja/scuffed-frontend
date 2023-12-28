import { Box, Container, Paper } from "@mui/material";
import { useAppSelector } from "../hooks/useAppSelector";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect } from "react";

import { Product } from "../types/ProductTypes";
import ProductInfo from "../components/ProductInfo";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchOneProduct } from "../redux/reducers/productsReducer";

export default function SingleProductPage() {
	const { productID } = useParams();

	const product: Product | undefined = useAppSelector((state) => {
		return state.productsReducer.products.find((p) => p.id === productID);
	});

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (productID !== undefined) dispatch(fetchOneProduct(productID));
	}, [dispatch]);

	return (
		<Container component="main" maxWidth="lg" sx={{ mt: "5rem" }}>
			<Box display="flex" flexDirection="row" flexWrap="wrap" gap={3}>
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
									<img
										src={img.url}
										key={img.id}
										alt={product.title}
									/>
								))}
						</Carousel>
					</Box>
				</Paper>
			</Box>
		</Container>
	);
}
