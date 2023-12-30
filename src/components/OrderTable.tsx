import {
	Box,
	Button,
	Collapse,
	IconButton,
	MenuItem,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppSelector } from "../hooks/useAppSelector";
import { Order, OrderStatus, OrderUpdate } from "../types/OrderTypes";
import { ProductDataGridProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllOrders, updateOrder } from "../redux/reducers/ordersReducer";
import TableActionButtons from "./TableActionButtons";

function Row(props: { row: Order; accessToken: string }) {
	const { row } = props;
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [orderStatus, setOrderStatus] = useState(row.status);

	const dispatch = useAppDispatch();

	function handleEditClick() {
		setIsEditing(true);
	}
	const asd = handleEditClick;

	function handleSaveClick() {
		const updatedOrder: OrderUpdate = {
			order: { status: orderStatus },
			id: row.id,
			accessToken: props.accessToken,
		};
		console.log(updatedOrder);
		dispatch(updateOrder(updatedOrder));
		setIsEditing(false);
	}

	function handleCancelClick() {
		setIsEditing(false);
	}

	return (
		<React.Fragment>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell>
					<IconButton
						aria-label="expand row"
						size="small"
						onClick={() => setOpen(!open)}
					>
						{open ? (
							<KeyboardArrowUpIcon />
						) : (
							<KeyboardArrowDownIcon />
						)}
					</IconButton>
				</TableCell>
				<TableCell align="right">
					{row.user.firstName} {row.user.lastName}
				</TableCell>
				<TableCell align="right">
					<Typography>{row.address.street}</Typography>
				</TableCell>
				<TableCell align="right">
					<Typography>{row.address.city}</Typography>
				</TableCell>
				<TableCell align="right">
					<Typography>{row.address.zipcode}</Typography>
				</TableCell>
				<TableCell align="right">
					<Typography>{row.address.country}</Typography>
				</TableCell>
				<TableCell align="right">
					{isEditing ? (
						<TextField
							select
							value={orderStatus}
							onChange={(e) =>
								setOrderStatus(e.target.value as OrderStatus)
							}
						>
							<MenuItem value="Pending"> Pending</MenuItem>
							<MenuItem value="Sent"> Sent</MenuItem>
							<MenuItem value="Delivered"> Delivered</MenuItem>
							<MenuItem value="Cancelled"> Cancelled</MenuItem>
						</TextField>
					) : (
						<Typography>{row.status}</Typography>
					)}
				</TableCell>
				<TableCell align="right">
					<TableActionButtons
						isEditing={isEditing}
						handleEditClick={handleEditClick}
						handleCancelClick={handleCancelClick}
						handleSaveClick={handleSaveClick}
					/>
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell
					style={{ paddingBottom: 0, paddingTop: 0 }}
					colSpan={6}
				>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography
								variant="h6"
								gutterBottom
								component="div"
							>
								Products
							</Typography>
							<Table size="small" aria-label="purchases">
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography>Product</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography>Price</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography>Amount</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography>
												Total price (€)
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{row.orderProducts.map((op) => (
										<TableRow key={op.product.id}>
											<TableCell
												component="th"
												scope="row"
											>
												{op.product.title}
											</TableCell>
											<TableCell align="right">
												{op.price} €
											</TableCell>
											<TableCell align="right">
												{op.amount}
											</TableCell>
											<TableCell align="right">
												{Math.round(
													op.amount * op.price * 100
												) / 100}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</React.Fragment>
	);
}

export default function OrderTable(props: ProductDataGridProps) {
	const orders: Order[] = useAppSelector(
		(state) => state.ordersReducer.orders
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllOrders({ accessToken: props.accessToken }));
	}, []);
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell align="right">
							<Typography>Name</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>Street</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>City</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>Zipcode</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>Country</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>Status</Typography>
						</TableCell>
						<TableCell align="right">
							<Typography>Actions</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders.map((o) => (
						<Row
							key={o.id}
							row={o}
							accessToken={props.accessToken}
						/>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
