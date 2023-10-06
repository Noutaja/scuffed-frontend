import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
	const currentUser = useAppSelector((state) => state.usersReducer.currentUser);
	const navigate = useNavigate();
  const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [nameText, setNameText] = useState("");
	const [avatarText, setAvatarText] = useState("");

	useEffect(() => {
		if (!currentUser) {
			navigate("/login");
		}
	}, [currentUser]);

	return (
		<Container>
			<Typography variant="h3">User Profile</Typography>
      <Box component="img" src={currentUser?.avatar}/>
      <Typography>Name: {currentUser?.name}</Typography>
      <Typography>Avatar URL: {currentUser?.avatar}</Typography>
      <Typography>Email: {currentUser?.email}</Typography>
      <Button variant="contained">EDIT PROFILE</Button>

		</Container>
	);
}
