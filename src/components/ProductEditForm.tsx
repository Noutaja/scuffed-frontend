import React, { useState } from 'react'
import { Product } from '../types/Types'
import { Button, TextField } from '@mui/material'
import { updateProduct } from '../redux/reducers/productsReducer';
import { useAppDispatch } from '../hooks/useAppDispatch';

export default function ProductEditForm(props: {p: Product, setIsEditing: React.Dispatch<React.SetStateAction<boolean>>}) {
  const p = props.p;
const [title, setTitle] = useState(p.title);
const [price, setPrice] = useState(p.price);
const [description, setDescription] = useState(p.description);
const [category, setCategory] = useState(p.category.id);
const dispatch = useAppDispatch();


  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const updatedProduct: Product = {id: p.id, title: title, price: price, description: description, category: p.category, images: p.images};
    dispatch(updateProduct(updatedProduct));
    props.setIsEditing(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField value={title} onChange={(e) => setTitle(e.target.value)}></TextField>
      <TextField value={price} onChange={(e) => setPrice(Number(e.target.value))}></TextField>
      <TextField value={description} onChange={(e) => setDescription(e.target.value)}></TextField>
      <TextField value={category} onChange={(e) => setCategory(Number(e.target.value))}></TextField>
      <Button type="submit" variant="contained">UPDATE</Button>
      </form>
  )
}
