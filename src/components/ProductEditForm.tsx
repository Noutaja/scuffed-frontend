import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Stack, TextField } from "@mui/material";
import {
	createProduct,
	updateProduct,
} from "../redux/reducers/productsReducer";

import { ProductCreate, ProductUpdate } from "../types/Types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import addIdsToList from "../helpers/addIdsToList";
import { ProductEditFormProps } from "../types/Props";

export default function ProductEditForm(props: ProductEditFormProps) {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [images, setImages] = useState<string[]>(props.product ? props.product.images : [""]);
	const indexedImages = addIdsToList(images);
	const dispatch = useAppDispatch();

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (props.product) {
			const p = props.product;

			const updatedProduct: ProductUpdate = { id: p.id };
			if(title.length) updatedProduct.title = title;
			if(price.length) updatedProduct.price = Number(price);
			if(description.length) updatedProduct.description = description;
			if(categoryId.length) updatedProduct.categoryId = Number(categoryId);
			if(images.length) updatedProduct.images = images;
			dispatch(updateProduct(updatedProduct));
		} else {
			const newProduct: ProductCreate = {
				title: title,
				price: Number(price),
				description: description,
				categoryId: Number(categoryId),
				images: images,
			};
			dispatch(createProduct(newProduct));
		}
	}

	function handleUrlChange(text: string, id: number) {
		setImages([
			...images.slice(0, id),
			(images[id] = text),
			...images.slice(id + 1),
		]);
	}

	return (
		<form onSubmit={handleSubmit}>
			<Box display="flex" flexDirection="row">
				<Stack>
					<TextField
						label="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						sx={{ m: 1 }}
					/>
					<TextField
						label="Price"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						sx={{ m: 1 }}
					/>
					<TextField
						label="Category id"
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						sx={{ m: 1 }}
					/>
				</Stack>
				<TextField
					label="Description"
					multiline
					rows={8}
					value={description}
					onChange={(e) => setDescription(e.target.value)}
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
