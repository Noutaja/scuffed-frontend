import { styled } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const UnstyledLink = styled(Link)(({ theme }) => ({
	color: "inherit",
	textDecoration: "none",
}));
