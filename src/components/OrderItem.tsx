import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import OrderProduct from "./OrderProduct";
import AddressItem from "./AddressItem";
import { Order, OrderUpdate } from "../types/OrderTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { updateOrder } from "../redux/reducers/ordersReducer";

type OrderItemProps = {
	order: Order;
	accessToken: string;
};
export default function OrderItem(props: OrderItemProps) {
	const dispatch = useAppDispatch();

	const o: Order = props.order;
	let totalPrice = 0;

	for (let op of o.orderProducts) {
		totalPrice += op.amount * op.price;
	}

	const createdAt = new Date(o.createdAt);
	const updatedAt = new Date(o.updatedAt);

	function handleCancel() {
		const updatedOrder: OrderUpdate = {
			order: {
				status: "Cancelled",
			},
			id: o.id,
			accessToken: props.accessToken,
		};
		dispatch(updateOrder(updatedOrder));
	}
	return (
		<Paper sx={{ p: 1 }}>
			<Stack spacing={1}>
				{o.orderProducts.map((op) => (
					<OrderProduct orderProduct={op} key={op.product.id} />
				))}
			</Stack>
			<AddressItem address={o.address} />
			<Typography>Total Price: {totalPrice} (€)</Typography>
			<Typography>Status: {o.status}</Typography>
			<Typography>Created on: {createdAt.toLocaleString()}</Typography>
			<Typography>Last Updated: {updatedAt.toLocaleString()}</Typography>
			{o.status === "Pending" && (
				<Button variant="contained" onClick={handleCancel}>
					Cancel
				</Button>
			)}
		</Paper>
	);
}
