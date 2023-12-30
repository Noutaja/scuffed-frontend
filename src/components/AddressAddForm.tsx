import { Button, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { createAddress } from "../redux/reducers/addressesReducer";
import { AddressCreate } from "../types/AddressTypes";
import { AddressAddFormProps } from "../types/Props";

export default function AddressAddForm(props: AddressAddFormProps) {
	const shippedCountries: string[] = [
		"Finland",
		"Sweden",
		"Norway",
		"Estonia",
	];
	const [streetText, setStreetText] = useState("");
	const [cityText, setCityText] = useState("");
	const [zipcodeText, setZipcodeText] = useState("");
	const [zipcodeIsValid, setZipcodeIsValid] = useState(true);
	const [zipcodeErrorMessage, setZipcodeErrorMessage] = useState("");
	const [countrySelection, setCountrySelection] = useState("");

	const dispatch = useAppDispatch();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (zipcodeText.length > 8) {
			setZipcodeIsValid(false);
			setZipcodeErrorMessage("Zipcode is too long");
			return;
		} else {
			setZipcodeIsValid(true);
			setZipcodeErrorMessage("");
		}
		const newAddress: AddressCreate = {
			address: {
				street: streetText,
				city: cityText,
				zipcode: zipcodeText,
				country: countrySelection,
			},
			accessToken: props.accessToken,
		};
		dispatch(createAddress(newAddress));
	}
	return (
		<form onSubmit={handleSubmit}>
			<Stack>
				<TextField
					label="Street"
					value={streetText}
					onChange={(e) => setStreetText(e.target.value)}
					required={true}
					sx={{ m: 1 }}
				/>
				<TextField
					label="City"
					value={cityText}
					onChange={(e) => setCityText(e.target.value)}
					required={true}
					sx={{ m: 1 }}
				/>
				<TextField
					label="Zipcode"
					value={zipcodeText}
					onChange={(e) => setZipcodeText(e.target.value)}
					required={true}
					error={!zipcodeIsValid}
					helperText={zipcodeErrorMessage}
					sx={{ m: 1 }}
				/>
				<TextField
					select
					label="Country"
					value={countrySelection}
					onChange={(e) => setCountrySelection(e.target.value)}
					required={true}
					sx={{ m: 1 }}
				>
					{shippedCountries.map((c, index) => (
						<MenuItem key={index} value={c}>
							{c}
						</MenuItem>
					))}
				</TextField>

				<Button type="submit" variant="contained">
					Add
				</Button>
			</Stack>
		</form>
	);
}
