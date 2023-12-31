import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridEventListener,
	GridRowEditStopParams,
	GridRowEditStopReasons,
	GridRowId,
	GridRowModel,
	GridRowModes,
	GridRowModesModel,
	GridRowsProp,
	GridToolbarContainer,
	MuiBaseEvent,
	MuiEvent,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

import { useAppSelector } from "../hooks/useAppSelector";
import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ProductDataGridProps } from "../types/Props";
import {
	Category,
	CategoryCreate,
	CategoryUpdate,
} from "../types/CategoryTypes";
import {
	createCategory,
	deleteOneCategory,
	fetchAllCategories,
	updateCategory,
} from "../redux/reducers/categoriesReducer";

export default function ProductDataGrid(props: ProductDataGridProps) {
	const categories: Category[] = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const initialRows: GridRowsProp = categories;
	const [rows, setRows] = useState(initialRows);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllCategories());
		setRows(categories);
	}, []);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 100 },
		{ field: "name", headerName: "Name", width: 170, editable: true },
		{
			field: "url",
			headerName: "Url",
			width: 170,
			editable: true,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode =
					rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							sx={{
								color: "primary.main",
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	function handleRowEditStop(
		params: GridRowEditStopParams<any>,
		event: MuiEvent<MuiBaseEvent>
	) {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	}

	interface EditToolbarProps {
		setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
		setRowModesModel: (
			newModel: (oldModel: GridRowModesModel) => GridRowModesModel
		) => void;
	}

	function EditToolbar(props: EditToolbarProps) {
		const { setRows, setRowModesModel } = props;

		const handleClick = () => {
			const id = uuidv4();
			setRows((oldRows) => [...oldRows, { id, isNew: true }]);
			setRowModesModel((oldModel) => ({
				...oldModel,
				[id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
			}));
		};

		return (
			<GridToolbarContainer>
				<Button
					color="primary"
					startIcon={<AddIcon />}
					onClick={handleClick}
				>
					Add record
				</Button>
			</GridToolbarContainer>
		);
	}

	function handleEditClick(id: GridRowId) {
		return () => {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.Edit },
			});
		};
	}

	function handleSaveClick(id: GridRowId) {
		return () => {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View },
			});
		};
	}

	function handleDeleteClick(id: GridRowId) {
		return () => {
			let tmp = rows.find((row) => row.id === id);
			dispatch(
				deleteOneCategory({
					id: tmp!.id,
					accessToken: props.accessToken,
				})
			);
			setRows(rows.filter((row) => row.id !== id));
		};
	}

	function handleCancelClick(id: GridRowId) {
		return () => {
			setRowModesModel({
				...rowModesModel,
				[id]: { mode: GridRowModes.View, ignoreModifications: true },
			});

			const editedRow = rows.find((row) => row.id === id);
			if (editedRow!.isNew) {
				setRows(rows.filter((row) => row.id !== id));
			}
		};
	}

	function processRowUpdate(newRow: GridRowModel) {
		const updatedRow = { ...newRow, isNew: false };

		if (newRow.isNew) {
			const newCategory: CategoryCreate = {
				category: {
					name: newRow.name,
					url: newRow.url,
				},
				accessToken: props.accessToken,
			};
			dispatch(createCategory(newCategory));
		} else {
			const updatedCategory: CategoryUpdate = {
				category: {
					name: newRow.name,
					url: newRow.url,
				},
				id: newRow.id,
				accessToken: props.accessToken,
			};
			dispatch(updateCategory(updatedCategory));
		}
		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	}

	function handleRowModesModelChange(newRowModesModel: GridRowModesModel) {
		setRowModesModel(newRowModesModel);
	}

	return (
		<Paper sx={{ width: "100%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
				slots={{
					toolbar: EditToolbar,
				}}
				slotProps={{
					toolbar: { setRows, setRowModesModel },
				}}
			/>
		</Paper>
	);
}
