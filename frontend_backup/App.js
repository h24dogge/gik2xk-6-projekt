import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <AppBar position="static" sx={{ bgcolor: "#222", mb: 4 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Webbshop GIK2XK
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Hem
          </Button>
          <Button color="inherit" component={Link} to="/admin">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </Router>
  );
}
export default App;
