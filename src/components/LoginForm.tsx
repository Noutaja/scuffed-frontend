import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	createUser,
	loginWithCredentials,
} from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [retypePwText, setRetypePwText] = useState("");
	const [nameText, setNameText] = useState("");
	const [avatarText, setAvatarText] = useState("");
	const [registering, setRegistering] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function handleLoginClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		if (validateInputs()) {
			const user = await dispatch(
				loginWithCredentials({ email: emailText, password: passwordText })
			);
			if (user.payload) {
				navigate("/");
			}
		}
	}

	async function handleRegisterClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		if (!registering) {
			setRegistering(true);
		} else {
			if (validateInputs()) {
				const name = emailText.split("@")[0];
				const user = await dispatch(
					createUser({ email: emailText, password: passwordText, name: name, avatar: "" })
				);
				if (user.payload) {
					navigate("profile");
				}
			}
		}
	}

	function validateInputs() {
		return true;
	}
	return (
		<Box display="flex" flexDirection="column" maxWidth="sm">
			<Typography variant="h4">Login</Typography>
			<TextField
				variant="filled"
				id="login-email"
				type="email"
				placeholder="Email"
				value={emailText}
				onChange={(e) => setEmailText(e.target.value)}
			/>
			<TextField
				variant="filled"
				id="login-password"
				type="password"
				placeholder="Password"
				value={passwordText}
				onChange={(e) => setPasswordText(e.target.value)}
			/>
			{registering && (
					<TextField
						variant="filled"
						id="register-retype-password"
						type="password"
						placeholder="Retype password"
						value={retypePwText}
						onChange={(e) => setRetypePwText(e.target.value)}
					/>
			)}
			<Button variant="contained" onClick={handleLoginClick}>
				LOGIN
			</Button>
			<Button variant="contained" onClick={handleRegisterClick}>
				REGISTER
			</Button>
		</Box>
	);
}
