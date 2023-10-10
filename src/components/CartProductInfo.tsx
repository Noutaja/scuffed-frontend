import React from "react";
import { Product } from "../types/Types";
import { Box, Typography } from "@mui/material";
import { UnstyledLink } from "../componentsCustom/UnstyledLink";

export default function CartProductInfo(props: { p: Product }) {
  const p = props.p;
  let shortDesc = p.description;
  if(p.description.length >= 40){
    shortDesc = shortDesc.slice(0,40);
    shortDesc += "...";
  }
	return (
		<UnstyledLink to={`/products/${p.id}`} sx={{display:"flex"}}>
			<Box component="img" src={p.images[0]} height={100} sx={{marginRight: "0.5em"}}></Box>
      <Box sx={{marginLeft: "0.5em"}}>
        <Typography sx={{display: {xs: "none", sm:"block"}}} variant="h5">{p.title}</Typography>
        <Typography sx={{display: {xs: "block", sm:"none"}}}>{p.title}</Typography>
        <Typography sx={{display: {xs: "none", sm:"block"}}}>{shortDesc}</Typography>
        <Typography variant="h5" sx={{display: {xs: "none", sm:"block"}}}>Price: {p.price} €</Typography>
        <Typography sx={{display: {xs: "block", sm:"none"}}}>Price: {p.price} €</Typography>
      </Box>
		</UnstyledLink>
	);
}
