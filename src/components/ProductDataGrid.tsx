import React, { useEffect, useState } from "react";
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
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
import { Product, ProductCreate, ProductUpdate } from "../types/ProductTypes";
import { Box, Button, Paper } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ProductDataGridProps } from "../types/Props";
import {
	createProduct,
	deleteOneProduct,
	fetchAllProducts,
	updateProduct,
} from "../redux/reducers/productsReducer";
import { Category } from "../types/CategoryTypes";

export default function ProductDataGrid(props: ProductDataGridProps) {
	const products: Product[] = useAppSelector(
		(state) => state.productsReducer.products
	);
	const categories: Category[] = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const initialRows: GridRowsProp = products;
	const [rows, setRows] = useState(initialRows);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllProducts());
		setRows(products);
	}, []);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 100 },
		{ field: "title", headerName: "Title", width: 170, editable: true },
		{
			field: "category",
			valueGetter: (params) => {
				if (!params.value) {
					return params.value;
				}
				return params.value.name;
			},
			headerName: "Category",
			width: 130,
			type: "singleSelect",
			valueOptions: categories.map((c) => c.name),
			editable: true,
		},
		{ field: "price", headerName: "Price", width: 100, editable: true },
		{
			field: "inventory",
			headerName: "Inventory",
			width: 120,
			editable: true,
		},
		{
			field: "description",
			headerName: "Description",
			width: 170,
			editable: true,
		},
		{
			field: "image",
			valueGetter: (params) => {
				if (!params.value) {
					if (params.row.images && params.row.images[0])
						return params.row.images[0].url;
				}
				return params.value;
			},
			headerName: "Primary Image",
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
			setRows((oldRows) => [
				...oldRows,
				{ id, category: "", isNew: true },
			]);
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

	function handleRowEditStop(
		params: GridRowEditStopParams<any>,
		event: MuiEvent<MuiBaseEvent>
	) {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
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
				deleteOneProduct({
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
		const c: Category = categories.find((c) => c.name === newRow.category)!;
		newRow.category = c;

		if (newRow.isNew) {
			const newProduct: ProductCreate = {
				product: {
					title: newRow.title,
					categoryId: c.id,
					price: newRow.price,
					inventory: newRow.inventory,
					description: newRow.description,
					images: [{ url: newRow.image, id: newRow.id }],
				},
				accessToken: props.accessToken,
			};
			dispatch(createProduct(newProduct));
		} else {
			const updatedProduct: ProductUpdate = {
				product: {
					title: newRow.title,
					categoryId: c.id,
					price: newRow.price,
					inventory: newRow.inventory,
					description: newRow.description,
				},
				id: newRow.id,
				accessToken: props.accessToken,
			};
			dispatch(updateProduct(updatedProduct));
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
