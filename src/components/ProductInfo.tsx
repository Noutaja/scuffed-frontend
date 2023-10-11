import React, { useState } from "react";
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ProductItemProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addOneItem } from "../redux/reducers/cartReducer";
import { useAppSelector } from "../hooks/useAppSelector";
import { deleteOneProduct } from "../redux/reducers/productsReducer";
import { useNavigate } from "react-router-dom";
import ProductEditModal from "./ProductEditModal";

export default function ProductInfo(props: ProductItemProps) {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const p = props.product;

	function onDeleteClicked() {
		dispatch(deleteOneProduct(p.id));
		navigate("/");
	}
	return (
		<Box component="section" display="flex" justifyContent="space-around">
			<Card>
				<CardContent>
					<Typography variant="h3">{p.title}</Typography>
					<Typography variant="h5">{p.description}</Typography>
					<Typography variant="h5">{p.price} €</Typography>
				</CardContent>
				<CardActions>
					<Button variant="contained" onClick={() => dispatch(addOneItem(p))}>
						ADD TO CART
					</Button>
					{currentUser && currentUser.role === "admin" && (
						<Box>
							<ProductEditModal product={p}>
								<EditIcon color="primary"/>
							</ProductEditModal>
							<Button color="primary" onClick={onDeleteClicked}>
								<DeleteIcon />
							</Button>
						</Box>
					)}
				</CardActions>
			</Card>
		</Box>
	);
}
