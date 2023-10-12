import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, MenuItem, Stack, TextField, Typography } from "@mui/material";

import {
	createProduct,
	updateProduct,
} from "../redux/reducers/productsReducer";

import { Product, ProductCreate, ProductUpdate } from "../types/Types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import addIdsToList from "../helpers/addIdsToList";
import { ProductEditFormProps } from "../types/Props";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import { useNavigate } from "react-router-dom";

export default function ProductEditForm(props: ProductEditFormProps) {
	const error = useAppSelector((state) => state.productsReducer.error);
	const categories = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [images, setImages] = useState<string[]>(
		props.product ? props.product.images : [""]
	);
	const indexedImages = addIdsToList(images);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	let isEditing: boolean;
	if (props.product) {
		isEditing = true;
	} else {
		isEditing = false;
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (props.product) {
			const p = props.product;

			const input: ProductUpdate = { id: p.id };
			if (title.length) input.title = title;
			if (price.length) input.price = Number(price);
			if (description.length) input.description = description;
			if (categoryId.length) input.categoryId = Number(categoryId);
			if (images.length) input.images = images;
			dispatch(updateProduct(input));
		} else {
			const input: ProductCreate = {
				title: title,
				price: Number(price),
				description: description,
				categoryId: Number(categoryId),
				images: images,
			};
			dispatch(createProduct(input));
			navigate("/");
		}
	}

	function handleUrlChange(text: string, id: number) {
		setImages([
			...images.slice(0, id),
			(images[id] = text),
			...images.slice(id + 1),
		]);
	}

	useEffect(() => {
		dispatch(fetchAllCategories());
	}, []);

	return (
		<form onSubmit={handleSubmit}>
			{error && <Typography>{error}!</Typography>}
			<Box display="flex" flexDirection="row">
				<Stack>
					<TextField
						label="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required={!isEditing}
						sx={{ m: 1 }}
					/>
					<TextField
						label="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required={!isEditing}
						sx={{ m: 1 }}
					/>
					<TextField
						select
						label="Category"
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						required={!isEditing}
						sx={{ m: 1 }}
					>
						{categories.map((c) => (
							<MenuItem key={c.id} value={c.id}>
								{c.name}
							</MenuItem>
						))}
					</TextField>
				</Stack>
				<TextField
					label="Description"
					multiline
					rows={8}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required={!isEditing}
					sx={{ m: 1 }}
				/>
			</Box>
			<Stack
				maxHeight={400}
				sx={{ p: 2, overflowY: "auto", overflowX: "hidden" }}
			>
				{indexedImages.map((i) => (
					<Box key={i.id} display="flex">
						<TextField
							fullWidth
							label="Image url"
							value={i.item}
							onChange={(e) => handleUrlChange(e.target.value, i.id)}
							required={!isEditing}
							sx={{ m: 1 }}
						/>
						<Button
							onClick={() =>
								setImages([...images.slice(0, i.id), ...images.slice(i.id + 1)])
							}
						>
							<RemoveIcon />
						</Button>
					</Box>
				))}
				<Button onClick={() => setImages([...images, ""])}>
					<AddIcon />
				</Button>
			</Stack>

			<Button type="submit" variant="contained">
				{props.children}
			</Button>
		</form>
	);
}
