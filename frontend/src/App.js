import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Admin from "./components/Admin";
import CartView from "./components/CartView";

function App() {
  return (
    <Router>
      {/* Enkel meny högst upp  */}
      <AppBar position="static" sx={{ bgcolor: "#333", mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Min Shop
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Hem
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Varukorg
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cart" element={<CartView />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
