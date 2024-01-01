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
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

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
	const [addressError, setaddressError] = useState(false);
	const [addressErrorMessage, setAddressErrorMessage] = useState("");
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
		if (addressSelector === "") {
			setaddressError(true);
			setAddressErrorMessage("Address must be selected");
			return;
		} else {
			setaddressError(false);
			setAddressErrorMessage("");
		}
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
				{addresses.filter((address) => !address.hidden).length ? (
					<Box>
						<Box p={1}>
							<TextField
								select
								label="Address"
								value={addressSelector}
								error={addressError}
								helperText={addressErrorMessage}
								onChange={(e) =>
									setAddressSelector(e.target.value)
								}
								sx={{ m: 1, minWidth: 120 }}
							>
								{addresses
									.filter((address) => !address.hidden)
									.map((a) => (
										<MenuItem key={a.id} value={a.id}>
											{a.street}
										</MenuItem>
									))}
							</TextField>
							{selectedAddress && (
								<AddressItem address={selectedAddress} />
							)}
						</Box>

						<Tooltip title="Place order, payment not implemented">
							<Button variant="contained" onClick={handleSubmit}>
								Place order
							</Button>
						</Tooltip>
					</Box>
				) : (
					<Box
						p={2}
						display={"flex"}
						alignItems={"center"}
						flexDirection="column"
					>
						<Typography variant="h4">
							No addresses! Go to Profile and add some.
						</Typography>
						<UnstyledLink to="/profile">
							<Button variant="contained">To profile</Button>
						</UnstyledLink>
					</Box>
				)}
			</Box>
		</Box>
	);
}
