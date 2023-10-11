import { Box, ThemeProvider, createTheme } from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import MainPage from "./pages/MainPage";
import SingleProductPage from "./pages/SingleProductPage";
import Header from "./components/Header";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import store from "./redux/store";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<HashRouter basename="/">
					<Box display="flex" flexDirection="column" minHeight="100vh">
						<Header />
						<Routes>
							<Route path="/" element={<MainPage />} />
							<Route
								path="products/:productID"
								element={<SingleProductPage />}
							/>
							<Route path="login" element={<LoginPage />} />
							<Route path="profile" element={<ProfilePage />} />
							<Route path="cart" element={<CartPage />} />
						</Routes>
						<Footer />
					</Box>
				</HashRouter>
			</ThemeProvider>
		</Provider>
	);
}

const theme = createTheme({
	typography: {
		fontSize: 12,
	},
});

export default App;
