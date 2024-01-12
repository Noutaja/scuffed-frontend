import {
	Box,
	Button,
	Paper,
	TextField,
	Tooltip,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { UserRole, UserUpdate } from "../types/UserTypes";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	deleteProfileWithToken,
	fetchProfileWithToken,
	logoutUser,
	updateUser,
} from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";

export default function UserProfileInfo() {
	const currentUser = useAppSelector(
		(state) => state.usersReducer.currentUser
	);
	const accessToken = useAppSelector(
		(state) => state.usersReducer.accessToken
	);

	const [firstNameText, setFirstNameText] = useState(
		currentUser?.firstName || ""
	);
	const [lastNameText, setLastNameText] = useState(
		currentUser?.lastName || ""
	);
	const [avatarText, setAvatarText] = useState(currentUser?.avatar || "");
	const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const updatedUser: UserUpdate = {
			user: {},
			id: currentUser?.id!,
			accessToken: accessToken,
		};
		if (firstNameText.length) updatedUser.user.firstName = firstNameText;
		if (lastNameText.length) updatedUser.user.lastName = lastNameText;
		if (avatarText.length) updatedUser.user.avatar = avatarText;

		await dispatch(updateUser(updatedUser));
		await dispatch(fetchProfileWithToken(accessToken));
	}

	async function handleDelete() {
		if (currentUser?.role == UserRole.Admin) {
			setDeleteErrorMessage("Admin profiles can't be deleted!");
			return;
		}
		await dispatch(deleteProfileWithToken(accessToken));
		dispatch(logoutUser());
		navigate("/");
	}

	const [isEditing, setIsEditing] = useState(false);
	return (
		<Box
			display="flex"
			flexDirection="column"
			alignItems="center"
			maxWidth="md"
			margin="auto"
			padding={1}
		>
			<Typography variant="h3">
				{currentUser?.firstName} {currentUser?.lastName}
			</Typography>
			<Box
				component="img"
				src={currentUser?.avatar}
				sx={{ borderRadius: "50%", width: 150 }}
			/>
			<Box padding={1}>
				<Typography>Avatar URL: {currentUser?.avatar}</Typography>
				<Typography>Email: {currentUser?.email}</Typography>
			</Box>
			{isEditing && (
				<Paper
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "column",
						p: 1,
						m: 1,
					}}
				>
					<TextField
						variant="filled"
						id="edit-firstname"
						type="text"
						label="First name"
						required
						value={firstNameText}
						onChange={(e) => setFirstNameText(e.target.value)}
					></TextField>
					<TextField
						variant="filled"
						id="edit-lastname"
						type="text"
						label="Last name"
						required
						value={lastNameText}
						onChange={(e) => setLastNameText(e.target.value)}
					/>
					<TextField
						variant="filled"
						id="edit-avatar"
						type="text"
						label="Avatar url"
						required
						value={avatarText}
						onChange={(e) => setAvatarText(e.target.value)}
					/>
					<Button type="submit">Confirm edits</Button>
				</Paper>
			)}
			<Box display={"flex"} flexDirection={"row"}></Box>
			<Button
				variant="contained"
				onClick={() => setIsEditing(!isEditing)}
			>
				Edit Profile
			</Button>
			<Button variant="contained" color="error" onClick={handleDelete}>
				Delete Profile
			</Button>
			{deleteErrorMessage.length > 0 && (
				<Typography color={"error"}>{deleteErrorMessage}</Typography>
			)}
		</Box>
	);
}
