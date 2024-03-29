import React, { useState } from "react";
import { useAppSelector } from "../hooks/useAppSelector";
import ProductDataGrid from "./ProductDataGrid";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import CategoryDataGrid from "./CategoryDataGrid";
import OrderTable from "./OrderTable";
import UserDataGrid from "./UserDataGrid";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchAllUsers } from "../redux/reducers/usersReducer";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: 3 }}>{children}</Box>}
		</div>
	);
}

export default function AdminDataGrid() {
	const accessToken = useAppSelector(
		(state) => state.usersReducer.accessToken
	);
	const [selectedTab, setSelectedTab] = useState(0);
	const productError = useAppSelector((state) => state.productsReducer.error);

	const dispatch = useAppDispatch();
	dispatch(fetchAllUsers({ accessToken: accessToken })); //Bandaid to fix users not being ready the first time.

	return (
		<Box sx={{ width: "100%" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={selectedTab}
					onChange={(e, value) => setSelectedTab(value)}
				>
					<Tab label="Products" />
					<Tab label="Categories" />
					<Tab label="Orders" />
					<Tab label="Users" />
				</Tabs>
			</Box>
			{productError && (
				<Typography color={"error"} sx={{ textAlign: "center" }}>
					{productError}
				</Typography>
			)}
			<CustomTabPanel value={selectedTab} index={0}>
				<ProductDataGrid accessToken={accessToken} />
			</CustomTabPanel>
			<CustomTabPanel value={selectedTab} index={1}>
				<CategoryDataGrid accessToken={accessToken} />
			</CustomTabPanel>
			<CustomTabPanel value={selectedTab} index={2}>
				<OrderTable accessToken={accessToken} />
			</CustomTabPanel>
			<CustomTabPanel value={selectedTab} index={3}>
				<UserDataGrid accessToken={accessToken} />
			</CustomTabPanel>
		</Box>
	);
}
