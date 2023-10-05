import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	loginWithCredentials,
} from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function handleLoginClick(
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		e.preventDefault();
		if (validateInputs()) {
			const user = await dispatch(loginWithCredentials({email: emailText, password: passwordText}));
			if(user.payload){
				navigate("/");
			}
		}

		function validateInputs() {
			return true;
		}
	}
	return (
		<Box display="flex" flexDirection="column">
			<Typography variant="h4">Login</Typography>
			<TextField
				variant="filled"
				id="login-email"
				type="email"
				placeholder="Login"
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
			<Button variant="contained" onClick={handleLoginClick}>
				LOGIN
			</Button>
		</Box>
	);
}
