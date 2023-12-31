import React, { useEffect } from "react";
import { Order } from "../types/OrderTypes";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { OrdersPanelProps } from "../types/Props";
import { fetchAllOrders } from "../redux/reducers/ordersReducer";
import { Box, Paper, Stack, Typography } from "@mui/material";
import OrderProduct from "./OrderProduct";
import AddressItem from "./AddressItem";
import OrderItem from "./OrderItem";

export default function OrdersPanel(props: OrdersPanelProps) {
	const orders: Order[] = useAppSelector(
		(state) => state.ordersReducer.orders
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchAllOrders({
				ownerID: props.currentUser?.id!,
				accessToken: props.accessToken,
			})
		);
	}, []);
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			maxWidth="md"
			margin="auto"
		>
			<Typography variant="h4">Orders</Typography>
			<Stack spacing={2}>
				{orders.map((o: Order) => (
					<OrderItem
						order={o}
						key={o.id}
						accessToken={props.accessToken}
					/>
				))}
			</Stack>
		</Box>
	);
}
