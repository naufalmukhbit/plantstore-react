import { Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Product from "pages/Product";
import Login from "pages/Login";
import Register from "pages/Register";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/product/:productId" element={<Product />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}

export default App;
