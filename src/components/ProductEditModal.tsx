import { Box, Button, Modal } from "@mui/material";
import React, { useEffect } from "react";

import ProductEditForm from "./ProductEditForm";
import { ProductEditModalProps } from "../types/Props";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { setProductsError } from "../redux/reducers/productsReducer";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	minWidth: "330px",
	maxWidth: "40%",
	bgcolor: "background.paper",
	borderRadius: "0.5em",
	boxShadow: 24,
	p: 4,
};

export default function ProductEditModal(props: ProductEditModalProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(setProductsError(undefined))
	}, [])
	

	return (
		<Box>
			<Button color="inherit" onClick={handleOpen}>
				{props.children}
			</Button>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="modal-product-edit"
				aria-describedby="modal-product-edit"
			>
				<Box sx={style}>
					<ProductEditForm product={props.product}>
						{props.product ? "UPDATE" : "CREATE"}
					</ProductEditForm>
				</Box>
			</Modal>
		</Box>
	);
}
