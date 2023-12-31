import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../hooks/useAppDispatch";
import {
	createUser,
	loginWithCredentials,
} from "../redux/reducers/usersReducer";
import { useAppSelector } from "../hooks/useAppSelector";
import {
	validateConfirmPw,
	validateEmail,
	validatePassword,
} from "../helpers/loginFormValidators";
import { UserRole } from "../types/UserTypes";

export default function LoginForm() {
	const error = useAppSelector((state) => state.usersReducer.error);
	const [isRegistering, setIsRegistering] = useState(false);

	const [emailText, setEmailText] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(true);
	const [emailValidationMessage, setEmailValidationMessage] = useState("");

	const [firstNameText, setFirstNameText] = useState("");
	const [lastNameText, setLastNameText] = useState("");

	const [passwordText, setPasswordText] = useState("");
	const [isPasswordValid, setIsPasswordValid] = useState(true);
	const [passwordValidationMessage, setPasswordValidationMessage] =
		useState("");

	const [confirmPwText, setConfirmPwText] = useState("");
	const [isConfirmPwValid, setIsConfirmPwValid] = useState(true);
	const [confirmPwValidationMessage, setConfirmPwValidationMessage] =
		useState("");

	const [isFormValid, setIsFormValid] = useState(false); //Used in the future

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
		if (passwordText === confirmPwText) {
			const user = await dispatch(
				createUser({
					email: emailText,
					password: passwordText,
					firstName: firstNameText,
					lastName: lastNameText,
					avatar: "https://i.pravatar.cc/300", //placeholder url
				})
			);
			if (user.payload) {
				await dispatch(
					loginWithCredentials({
						email: emailText,
						password: passwordText,
					})
				);
				navigate("/profile");
			}
		}
	}

	function onEmailChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setEmailText(e.target.value);
		validateEmail(emailText, setIsEmailValid, setEmailValidationMessage);
		setIsFormValid(
			!isRegistering
				? isEmailValid && isPasswordValid
				: isEmailValid && isPasswordValid && isConfirmPwValid
		);
	}

	function onPasswordChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setPasswordText(e.target.value);
		const passwordField = {
			text: e.target.value,
			setIsValid: setIsPasswordValid,
			setValidationMessage: setPasswordValidationMessage,
		};
		validatePassword(isRegistering, passwordField);
		setIsFormValid(
			!isRegistering
				? isEmailValid && isPasswordValid
				: isEmailValid && isPasswordValid && isConfirmPwValid
		);
	}

	function onConfirmPwChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) {
		setConfirmPwText(e.target.value);
		const passwordField = {
			text: passwordText,
			setIsValid: setIsPasswordValid,
			setValidationMessage: setPasswordValidationMessage,
		};
		const confirmPwField = {
			text: e.target.value,
			setIsValid: setIsConfirmPwValid,
			setValidationMessage: setConfirmPwValidationMessage,
		};
		validateConfirmPw(passwordField, confirmPwField);
		setIsFormValid(isEmailValid && isPasswordValid && isConfirmPwValid);
	}

	return (
		<Box display="flex" flexDirection="column" maxWidth="sm" sx={{ mt: 3 }}>
			{error && <Typography>{error}</Typography>}
			<Box display="flex">
				<Button
					variant={!isRegistering ? "contained" : "outlined"}
					onClick={() => setIsRegistering(false)}
					sx={{ flex: 1 }}
				>
					Login
				</Button>
				<Button
					variant={isRegistering ? "contained" : "outlined"}
					onClick={() => setIsRegistering(true)}
					sx={{ flex: 1 }}
				>
					Register
				</Button>
			</Box>
			<Paper
				component="form"
				onSubmit={isRegistering ? handleRegister : handleSubmit}
			>
				<Box
					display="flex"
					flexDirection="column"
					maxWidth="sm"
					gap={1}
					sx={{ p: 1 }}
				>
					<Typography variant="h4">
						{isRegistering ? "Register" : "Login"}
					</Typography>
					<TextField
						variant="filled"
						id="login-email"
						type="email"
						label="Email"
						required
						value={emailText}
						onChange={onEmailChange}
						error={!isEmailValid}
						helperText={emailValidationMessage}
					/>
					{isRegistering && (
						<TextField
							variant="filled"
							id="register-firstname"
							type="text"
							label="First name"
							required
							value={firstNameText}
							onChange={(e) => setFirstNameText(e.target.value)}
						/>
					)}
					{isRegistering && (
						<TextField
							variant="filled"
							id="register-lastname"
							type="text"
							label="Last name"
							required
							value={lastNameText}
							onChange={(e) => setLastNameText(e.target.value)}
						/>
					)}
					<TextField
						variant="filled"
						id="login-password"
						type="password"
						label="Password"
						required
						value={passwordText}
						onChange={onPasswordChange}
						error={!isPasswordValid}
						helperText={passwordValidationMessage}
					/>
					{isRegistering && (
						<TextField
							variant="filled"
							id="register-confirm-password"
							type="password"
							label="Confirm password"
							required
							value={confirmPwText}
							onChange={onConfirmPwChange}
							error={!isConfirmPwValid}
							helperText={confirmPwValidationMessage}
						/>
					)}
					<Button
						type="submit"
						variant="contained"
						//disabled={!isFormValid} currently this updates one keystroke behind
						sx={{ p: 2 }}
					>
						{isRegistering ? "REGISTER" : "LOGIN"}
					</Button>
				</Box>
			</Paper>
		</Box>
	);
}
