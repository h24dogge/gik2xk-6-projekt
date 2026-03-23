import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// HÄR ÄR FIXEN: Grid är tillagt i listan nedan
import {
  Typography,
  Rating,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import axios from "axios";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [valtBetyg, setValtBetyg] = useState(0);

  const fetchProduct = () => {
    axios
      .get(`http://localhost:3001/api/products/${id}`)
      .then((res) => setProduct(res.data));
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const skickaBetyg = () => {
    if (valtBetyg === 0) return alert("Välj stjärnor först!");
    axios
      .post(`http://localhost:3001/api/products/${id}/rate`, {
        rating: valtBetyg,
      })
      .then(() => {
        alert("Betyg sparat!");
        setValtBetyg(0);
        fetchProduct(); // Uppdaterar snittet och listan direkt
      });
  };

  const laggITillVarukorg = () => {
    axios
      .post("http://localhost:3001/api/users/cart/addProduct", {
        userId: 1,
        productId: product.id,
        amount: 1,
      })
      .then(() => alert("Lagd i korgen!"));
  };

  if (!product) return <Typography sx={{ p: 3 }}>Laddar produkt...</Typography>;

  // Uträkning av snittet för visning
  const antal = product.Ratings?.length || 0;
  const snitt =
    antal > 0 ? product.Ratings.reduce((a, b) => a + b.rating, 0) / antal : 0;

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Grid container spacing={4}>
        {/* Vänster sida: Bild */}
        <Grid item xs={12} md={6}>
          <img
            src={product.imageUrl}
            style={{
              width: "100%",
              borderRadius: "8px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
            alt={product.title}
          />
        </Grid>

        {/* Höger sida: Info och Köp */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h4" color="primary" sx={{ my: 2 }}>
            {product.price} kr
          </Typography>
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={laggITillVarukorg}
            sx={{ py: 2, fontSize: "1.1rem" }}
          >
            Lägg i varukorg
          </Button>

          <Divider sx={{ my: 4 }} />

          {/* Sektion för att sätta betyg */}
          <Box
            sx={{
              p: 3,
              bgcolor: "#f9f9f9",
              borderRadius: 2,
              border: "1px solid #eee",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Vad tycker du om produkten?
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Rating
                value={valtBetyg}
                onChange={(e, val) => setValtBetyg(val)}
                size="large"
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={skickaBetyg}
              >
                Spara betyg
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Recensioner längst ner */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h5" gutterBottom>
          Kundrecensioner ({antal})
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
          <Typography variant="h2">{snitt.toFixed(1)}</Typography>
          <Box>
            <Rating value={snitt} readOnly precision={0.5} />
            <Typography variant="body2" color="text.secondary">
              Baserat på alla omdömen
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <List>
          {product.Ratings && product.Ratings.length > 0 ? (
            product.Ratings.map((r, i) => (
              <ListItem key={i} divider sx={{ px: 0 }}>
                <Box sx={{ width: "100%" }}>
                  <Rating value={r.rating} readOnly size="small" />
                  <Typography variant="body2" color="text.secondary">
                    Inskickat: {new Date(r.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </ListItem>
            ))
          ) : (
            <Typography color="text.secondary italic">
              Inga recensioner än.
            </Typography>
          )}
        </List>
      </Box>
    </Paper>
  );
}

export default ProductDetail;
