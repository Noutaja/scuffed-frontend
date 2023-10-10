import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	createUser,
	loginWithCredentials,
	setError,
} from "../redux/reducers/usersReducer";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";

export default function LoginForm() {
	const error = useAppSelector((state) => state.usersReducer.error);
	const [emailText, setEmailText] = useState("");
	const [passwordText, setPasswordText] = useState("");
	const [retypePwText, setRetypePwText] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const user = await dispatch(
			loginWithCredentials({ email: emailText, password: passwordText })
		);
		if (user.payload) {
			navigate("/");
		}
	}

	async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (validateInputs()) {
			if (passwordText === retypePwText) {
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
					navigate("/profile");
				}
			}
		}
	}

	function validateInputs() {
		//General Email Regex (RFC 5322 Official Standard)
		const emailRegex =
			/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
		if (!emailRegex.test(emailText)) {
			dispatch(setError("Invalid Email!"));
			return false;
		}
		if (passwordText.length < 8) {
			dispatch(setError("Password is too short!"));
			return false;
		}
		if(passwordText === retypePwText){
			dispatch(setError("Passwords must match!"))
		}
		dispatch(setError(undefined));
		return true;
	}
	return (
		<Box display="flex" flexDirection="column" maxWidth="sm">
			{error && <Typography>{error}</Typography>}
			<form onSubmit={isRegistering ? handleRegister : handleSubmit}>
				<Box display="flex" flexDirection="column" maxWidth="sm">
					<Typography variant="h4">{isRegistering ? "Register" : "Login"}</Typography>
					<TextField
						variant="filled"
						id="login-email"
						type="email"
						placeholder="Email"
						required
						value={emailText}
						onChange={(e) => setEmailText(e.target.value)}
					/>
					<TextField
						variant="filled"
						id="login-password"
						type="password"
						placeholder="Password"
						required
						value={passwordText}
						onChange={(e) => setPasswordText(e.target.value)}
					/>
					{isRegistering && (
						<TextField
							variant="filled"
							id="register-retype-password"
							type="password"
							placeholder="Retype password"
							required
							value={retypePwText}
							onChange={(e) => setRetypePwText(e.target.value)}
						/>
					)}
					<Button type="submit" variant="contained">
						{isRegistering ? "REGISTER" : "LOGIN"}
					</Button>
				</Box>
			</form>

			{!isRegistering && (
				<Button variant="contained" onClick={() => setIsRegistering(true)}>
					REGISTER
				</Button>
			)}
		</Box>
	);
}
