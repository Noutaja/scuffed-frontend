import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
	Box,
	Button,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { ProductCreate, ProductUpdate } from "../types/ProductTypes";
import { Image } from "../types/Types";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { ProductEditFormProps } from "../types/Props";
import { useAppSelector } from "../hooks/useAppSelector";
import { fetchAllCategories } from "../redux/reducers/categoriesReducer";
import {
	createProduct,
	fetchOneProduct,
	setProductsError,
	updateProduct,
} from "../redux/reducers/productsReducer";

export default function ProductEditForm(props: ProductEditFormProps) {
	const accessToken = useAppSelector(
		(state) => state.usersReducer.accessToken
	);
	const error = useAppSelector((state) => state.productsReducer.error);
	const categories = useAppSelector(
		(state) => state.categoriesReducer.categories
	);
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [images, setImages] = useState(
		props.product ? props.product.images : []
	);
	const [deletedImages, setDeletedImages] = useState<string[]>([]);

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

			const input: ProductUpdate = {
				id: p.id,
				accessToken: accessToken,
				product: {
					updatedImages: [],
					newImages: [],
					deletedImages: [],
				},
			};
			if (title.length) input.product.title = title;
			if (price.length) input.product.price = Number(price);
			if (description.length) input.product.description = description;
			if (categoryId.length) input.product.categoryId = categoryId;
			if (images.length) {
				for (let img of images) {
					if (img.fromDB) input.product.updatedImages?.push(img);
					else if (img.fromDB !== undefined && !img.fromDB)
						input.product.newImages?.push(img);
				}
			}
			if (deletedImages.length)
				input.product.deletedImages = deletedImages;
			setDeletedImages([]);
			dispatch(updateProduct(input));
			dispatch(fetchOneProduct(p.id));
			props.onClose();
		} else {
			const input: ProductCreate = {
				product: {
					title: title,
					price: Number(price),
					description: description,
					categoryId: categoryId,
					images: images,
				},
				accessToken: accessToken,
			};
			if (images.length < 1) {
				dispatch(
					setProductsError("Product must have at least one image")
				);
				return;
			}
			dispatch(createProduct(input));
			navigate("/");
		}
	}

	function handleUrlChange(text: string, id: number) {
		setImages((prevImages) =>
			prevImages.map((img, index) =>
				index === id ? { ...img, url: text } : img
			)
		);
	}

	function handleImageDeletion(index: number) {
		if (images.length === 1) {
			dispatch(setProductsError("Last image can't be deleted"));
			return;
		}
		const img: Image = images[index];
		if (img.fromDB) setDeletedImages([...deletedImages, img.id]);
		setImages([...images.slice(0, index), ...images.slice(index + 1)]);
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
				{images.map((img, index) => (
					<Box key={img.id} display="flex">
						<TextField
							fullWidth
							label="Image url"
							value={img.url}
							onChange={(e) =>
								handleUrlChange(e.target.value, index)
							}
							required={!isEditing}
							sx={{ m: 1 }}
						/>
						<Button onClick={() => handleImageDeletion(index)}>
							<RemoveIcon />
						</Button>
					</Box>
				))}
				<Button
					onClick={() =>
						setImages([
							...images,
							{
								url: "",
								id: uuidv4(),
								fromDB: false,
							},
						])
					}
				>
					<AddIcon />
				</Button>
			</Stack>

			<Button type="submit" variant="contained">
				{props.children}
			</Button>
		</form>
	);
}
