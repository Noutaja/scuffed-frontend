import {
	Box,
	Button,
	MenuItem,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllAddresses } from "../redux/reducers/addressesReducer";
import OrderProductList from "../components/OrderProductList";
import { Address } from "../types/AddressTypes";
import AddressItem from "../components/AddressItem";
import { createOrder } from "../redux/reducers/ordersReducer";
import { Order, OrderCreate, OrderProductCreate } from "../types/OrderTypes";
import { emptyCart } from "../redux/reducers/cartReducer";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
	const cartItems = useAppSelector((state) => state.cartReducer.items);
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const accessToken = useAppSelector(
		(state) => state.usersReducer.accessToken
	);
	const addresses = useAppSelector(
		(state) => state.addressesReducer.addresses
	);
	const dispatch = useAppDispatch();
	let totalPrice = cartItems.reduce(
		(prev, curr) => curr.amount * curr.product.price + prev,
		0
	);

	const [addressSelector, setAddressSelector] = useState("");
	const selectedAddress = addresses.find((a) => a.id === addressSelector);

	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			fetchAllAddresses({
				ownerID: currentUser?.id!,
				accessToken: accessToken,
			})
		);
	}, []);

	async function handleSubmit() {
		const orderProducts: OrderProductCreate[] = [];
		cartItems.map((ci) => {
			orderProducts.push({
				productID: ci.product.id,
				amount: ci.amount,
			});
		});
		const newOrder: OrderCreate = {
			order: {
				addressID: selectedAddress!.id,
				orderProducts: orderProducts,
			},
			accessToken: accessToken,
		};
		console.log(newOrder);
		await dispatch(createOrder(newOrder));
		dispatch(emptyCart());
		navigate("/");
	}

	return (
		<Box component="main" sx={{ mt: { xs: "5rem", sm: "5rem" } }}>
			<Box
				component="section"
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<Typography variant="h3">Placing Order</Typography>
				<OrderProductList cartItems={cartItems} />
				<Typography variant="h5">
					Total Price: {totalPrice} €
				</Typography>
				<TextField
					select
					label="Address"
					value={addressSelector}
					onChange={(e) => setAddressSelector(e.target.value)}
					sx={{ m: 1, minWidth: 120 }}
				>
					{addresses.map((a) => (
						<MenuItem key={a.id} value={a.id}>
							{a.street}
						</MenuItem>
					))}
				</TextField>
				{selectedAddress && <AddressItem address={selectedAddress} />}
				<Tooltip title="Place order, payment not implemented">
					<Button variant="contained" onClick={handleSubmit}>
						Place order
					</Button>
				</Tooltip>
			</Box>
		</Box>
	);
}
