import { Box, Button, TextField, Typography } from "@mui/material";
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
	const [isRegistering, setIsRegistering] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
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
		if (!isRegistering) {
			setIsRegistering(true);
		} else {
			if (validateInputs()) {
				const name = emailText.split("@")[0];
				const user = await dispatch(
					createUser({
						email: emailText,
						password: passwordText,
						name: name,
						avatar: "",
					})
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
			<form onSubmit={handleSubmit}>
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
					{isRegistering && (
						<TextField
							variant="filled"
							id="register-retype-password"
							type="password"
							placeholder="Retype password"
							value={retypePwText}
							onChange={(e) => setRetypePwText(e.target.value)}
						/>
					)}
					<Button type="submit" variant="contained">
						LOGIN
					</Button>
				</Box>
			</form>

			<Button variant="contained" onClick={handleRegisterClick}>
				REGISTER
			</Button>
		</Box>
	);
}
