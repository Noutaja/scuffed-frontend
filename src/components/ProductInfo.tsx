import React from "react";
import {
	Box,
	Button,
	Divider,
	Paper,
	Tooltip,
	Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { ProductItemProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { addOneItem } from "../redux/reducers/cartReducer";
import { useAppSelector } from "../hooks/useAppSelector";
import { deleteOneProduct } from "../redux/reducers/productsReducer";
import ProductEditModal from "./ProductEditModal";
import { UserRole } from "../types/Types";

export default function ProductInfo(props: ProductItemProps) {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const p = props.product;

	function onDeleteClicked() {
		dispatch(deleteOneProduct(p.id));
		navigate("/");
	}
	return (
		<Paper component="section" sx={{ flex: 1, flexBasis: 400 }}>
			<Box
				padding={1}
				display="flex"
				flexDirection="column"
				alignItems="center"
				justifyContent="space-around"
				height="100%"
			>
				<Box>
					<Box>
						<Typography variant="h3">{p.title}</Typography>
						<Typography variant="subtitle2">
							{p.category.name}
						</Typography>
					</Box>
					<Divider />
					<Typography variant="h5">{p.description}</Typography>
					<Typography variant="h4">{p.price} €</Typography>
				</Box>
				<Box display="flex">
					<Tooltip title="Add to cart">
						<Button onClick={() => dispatch(addOneItem(p))}>
							<ShoppingCartIcon />
						</Button>
					</Tooltip>
					{currentUser && currentUser.role === UserRole.Admin && (
						<Box display="flex">
							<ProductEditModal product={p}>
								<Tooltip title="ADMIN: Edit Product">
									<EditIcon color="primary" />
								</Tooltip>
							</ProductEditModal>
							<Tooltip title="ADMIN: Delete Product">
								<Button
									color="primary"
									onClick={onDeleteClicked}
								>
									<DeleteIcon />
								</Button>
							</Tooltip>
						</Box>
					)}
				</Box>
			</Box>
		</Paper>
	);
}
