import { PasswordFieldValidationObject } from "../types/Types";

export function validateEmail(
	emailText: string,
	setIsEmailTextValid: React.Dispatch<React.SetStateAction<boolean>>,
	setEmailValidationMessage: React.Dispatch<React.SetStateAction<string>>
) {
	//General Email Regex (RFC 5322 Official Standard)
	const emailRegex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	if (!emailRegex.test(emailText)) {
		setIsEmailTextValid(false);
		setEmailValidationMessage("Email is invalid");
	} else {
		setIsEmailTextValid(true);
		setEmailValidationMessage("");
	}
}

export function validatePassword(
	isRegistering: boolean,
	field: PasswordFieldValidationObject
) {
	if (isRegistering) {
		if (field.text.length < 8) {
			field.setIsValid(false);
			field.setValidationMessage("Password is too short!");
		} else {
			field.setIsValid(true);
			field.setValidationMessage("");
		}
	}
}

export function validateConfirmPw(
	pw: PasswordFieldValidationObject,
	confirmPw: PasswordFieldValidationObject
) {
	if (pw.text !== confirmPw.text) {
		confirmPw.setIsValid(false);
		confirmPw.setValidationMessage("Passwords must match!");
	} else {
		confirmPw.setIsValid(true);
		confirmPw.setValidationMessage("");
	}
}
