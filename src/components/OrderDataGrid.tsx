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
	MuiBaseEvent,
	MuiEvent,
} from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import { useAppSelector } from "../hooks/useAppSelector";
import { Box } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ProductDataGridProps } from "../types/Props";
import { Order, OrderCreate, OrderUpdate } from "../types/OrderTypes";
import {
	createOrder,
	fetchAllOrders,
	updateOrder,
} from "../redux/reducers/ordersReducer";

export default function ProductDataGrid(props: ProductDataGridProps) {
	const orders: Order[] = useAppSelector(
		(state) => state.ordersReducer.orders
	);
	const initialRows: GridRowsProp = orders;
	const [rows, setRows] = useState(initialRows);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	useEffect(() => {
		dispatch(fetchAllOrders({ accessToken: props.accessToken }));
		const initialRows: GridRowsProp = orders;
		setRows(orders);
	}, []);

	const dispatch = useAppDispatch();

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 100 },
		{
			field: "userId",
			valueGetter: (params) => {
				if (!params.value) {
					return params.row.userID;
				}
				return params.value;
			},
			headerName: "UserID",
			width: 170,
		},
		{
			field: "street",
			valueGetter: (params) => {
				return params.row.address.street;
			},
			headerName: "Street",
			width: 170,
		},
		{
			field: "city",
			valueGetter: (params) => {
				return params.row.address.city;
			},
			headerName: "City",
			width: 170,
		},
		{
			field: "zipcode",
			valueGetter: (params) => {
				return params.row.address.zipcode;
			},
			headerName: "Zipcode",
			width: 170,
		},
		{
			field: "Country",
			valueGetter: (params) => {
				return params.row.address.country;
			},
			headerName: "Url",
			width: 170,
		},
		{
			field: "status",
			headerName: "Status",
			width: 170,
			type: "singleSelect",
			valueOptions: ["Pending", "Sent", "Delivered", "Cancelled"],
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
		const updatedRow = { ...newRow };

		const updatedOrder: OrderUpdate = {
			order: {
				status: newRow.status,
			},
			id: newRow.id,
			accessToken: props.accessToken,
		};
		dispatch(updateOrder(updatedOrder));

		setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
		return updatedRow;
	}

	function handleRowModesModelChange(newRowModesModel: GridRowModesModel) {
		setRowModesModel(newRowModesModel);
	}

	return (
		<Box width={"100%"}>
			<DataGrid
				rows={rows}
				columns={columns}
				editMode="row"
				rowModesModel={rowModesModel}
				onRowModesModelChange={handleRowModesModelChange}
				onRowEditStop={handleRowEditStop}
				processRowUpdate={processRowUpdate}
			/>
		</Box>
	);
}
