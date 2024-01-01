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
import { User, UserRole, UserRoleUpdate } from "../types/UserTypes";
import { Paper } from "@mui/material";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { UserDataGridProps } from "../types/Props";
import {
	deleteOneUser,
	fetchAllUsers,
	updateUserRole,
} from "../redux/reducers/usersReducer";
import { Category } from "../types/CategoryTypes";

export default function UserDataGrid(props: UserDataGridProps) {
	const users: User[] = useAppSelector((state) => state.usersReducer.users);
	const categories: Category[] = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const initialRows: GridRowsProp = users;
	const [rows, setRows] = useState(initialRows);
	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchAllUsers({ accessToken: props.accessToken }));
		setRows(users);
	}, []);

	const columns: GridColDef[] = [
		{ field: "id", headerName: "ID", width: 100 },
		{
			field: "firstName",
			headerName: "First Name",
			width: 150,
		},
		{
			field: "lastName",
			headerName: "Last Name",
			width: 150,
		},
		{
			field: "email",
			headerName: "Email",
			width: 150,
		},
		{
			field: "role",
			headerName: "Role",
			width: 130,
			type: "singleSelect",
			valueOptions: [UserRole.Admin, UserRole.Normal],
			editable: true,
		},
		{
			field: "avatar",
			headerName: "Avatar Url",
			width: 150,
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
			let tmp = rows.find((row) => row.id === id);
			if (tmp!.role !== UserRole.Admin) {
				dispatch(
					deleteOneUser({
						id: tmp!.id,
						accessToken: props.accessToken,
					})
				);
				setRows(rows.filter((row) => row.id !== id));
			}
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
		const c: Category = categories.find((c) => c.name === newRow.category)!;
		updatedRow.category = c;

		const updatedUser: UserRoleUpdate = {
			role: newRow.role as UserRole,
			id: newRow.id,
			accessToken: props.accessToken,
		};
		dispatch(updateUserRole(updatedUser));
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
			/>
		</Paper>
	);
}
