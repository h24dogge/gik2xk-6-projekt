import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  Typography,
  Rating,
  CardContent,
  CardMedia,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data));
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((p) => {
        // Räkna ut snittbetyget för varje produkt
        const antalBetyg = p.Ratings?.length || 0;
        const summa = p.Ratings?.reduce((acc, r) => acc + r.rating, 0) || 0;
        const snitt = antalBetyg > 0 ? summa / antalBetyg : 0;

        return (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={p.imageUrl}
                alt={p.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" gutterBottom>
                  {p.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating value={snitt} readOnly precision={0.5} size="small" />
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    ({antalBetyg})
                  </Typography>
                </Box>
                <Typography variant="h6" color="primary">
                  {p.price} kr
                </Typography>
              </CardContent>
              <Button
                component={Link}
                to={`/product/${p.id}`}
                variant="contained"
                sx={{ m: 2 }}
              >
                Visa Produkt
              </Button>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ProductList;
