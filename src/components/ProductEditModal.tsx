import { Box, Button, Modal } from "@mui/material";
import React from "react";

import ProductEditForm from "./ProductEditForm";
import { ProductEditModalProps } from "../types/Props";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "30%",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function ProductEditModal(props: ProductEditModalProps) {
	const [isOpen, setIsOpen] = React.useState(false);
	const handleOpen = () => setIsOpen(true);
	const handleClose = () => setIsOpen(false);

	return (
		<div>
			<Button color="inherit" onClick={handleOpen}>
				{props.children}
			</Button>
			<Modal
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<ProductEditForm product={props.product}>
						{props.product ? "UPDATE" : "CREATE"}
					</ProductEditForm>
				</Box>
			</Modal>
		</div>
	);
}
