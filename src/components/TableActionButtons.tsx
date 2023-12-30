import { Box, Button } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

type TableActionButtonsProps = {
	isEditing: boolean;
	handleEditClick: () => void;
	handleSaveClick: () => void;
	handleCancelClick: () => void;
};

export default function TableActionButtons(props: TableActionButtonsProps) {
	return (
		<Box>
			{props.isEditing ? (
				<Box>
					<Button onClick={props.handleSaveClick}>
						<SaveIcon />
					</Button>
					<Button onClick={props.handleCancelClick}>
						<CancelIcon />
					</Button>
				</Box>
			) : (
				<Box>
					<Button onClick={props.handleEditClick}>
						<EditIcon />
					</Button>
				</Box>
			)}
		</Box>
	);
}
