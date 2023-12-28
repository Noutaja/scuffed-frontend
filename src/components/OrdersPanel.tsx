import React, { useEffect } from "react";
import { Order } from "../types/OrderTypes";
import { useAppSelector } from "../hooks/useAppSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { OrdersPanelProps } from "../types/Props";
import { fetchAllOrders } from "../redux/reducers/ordersReducer";
import { Box, Paper, Stack, Typography } from "@mui/material";
import OrderProduct from "./OrderProduct";

export default function OrdersPanel(props: OrdersPanelProps) {
	const orders: Order[] = useAppSelector(
		(state) => state.ordersReducer.orders
	);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllOrders(props.accessToken));
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
					<Box key={o.id}>
						<Paper>
							<Stack spacing={1}>
								{o.orderProducts.map((op) => (
									<OrderProduct
										orderProduct={op}
										key={op.product.id}
									/>
								))}
							</Stack>
							<Typography>
								Created on: {o.createdAt?.toString()}
							</Typography>
							<Typography>
								Last Updated: {o.createdAt?.toString()}
							</Typography>
						</Paper>
					</Box>
				))}
			</Stack>
		</Box>
	);
}
