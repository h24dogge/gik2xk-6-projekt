import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import axios from "axios";

function CartView() {
  const [cart, setCart] = useState(null);

  const fetchCart = () => {
    axios
      .get("http://localhost:3001/api/users/1/getCart")
      .then((res) => setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const taBortRad = (rowId) => {
    axios
      .delete(`http://localhost:3001/api/users/cart/row/${rowId}`)
      .then(() => fetchCart()) // Uppdaterar korgen direkt när varan är borta
      .catch((err) => console.error("Kunde inte ta bort produkt", err));
  };

  const rensaKorg = () => {
    if (window.confirm("Är du säker på att du vill tömma hela varukorgen?")) {
      axios
        .delete("http://localhost:3001/api/users/1/cart/clear")
        .then(() => fetchCart()) // Uppdaterar till en tom korg
        .catch((err) => console.error("Kunde inte rensa korgen", err));
    }
  };

  let total = 0;
  cart?.Cart_rows?.forEach((rad) => {
    if (rad.Product) total += rad.Product.price * rad.amount;
  });

  return (
    <Paper sx={{ p: 3 }}>
      {/* Box för att få rubrik och rensa knappen på samma rad */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4">Din Varukorg</Typography>

        {cart?.Cart_rows?.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={rensaKorg}
          >
            Rensa kundvagn
          </Button>
        )}
      </Box>

      <List>
        {cart?.Cart_rows?.map((rad) => (
          <ListItem
            key={rad.id}
            divider
            // secondaryAction lägger ikonen längst till höger
            secondaryAction={
              <IconButton
                edge="end"
                color="error"
                onClick={() => taBortRad(rad.id)}
                title="Ta bort produkt"
              >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={rad.Product?.title || "Produkt saknas"}
              secondary={`${rad.amount} st x ${rad.Product?.price || 0} kr`}
            />
            <Typography sx={{ mr: 4 }}>
              {(rad.Product?.price || 0) * rad.amount} kr
            </Typography>
          </ListItem>
        ))}
      </List>

      {cart?.Cart_rows?.length > 0 ? (
        <Box sx={{ mt: 3 }}>
          <Typography
            variant="h5"
            sx={{ textAlign: "right", fontWeight: "bold" }}
          >
            Totalt att betala: {total} kr
          </Typography>
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
          >
            Gå till kassan
          </Button>
        </Box>
      ) : (
        <Typography sx={{ mt: 2 }}>
          Varukorgen är tom. Gå till startsidan för att handla!
        </Typography>
      )}
    </Paper>
  );
}

export default CartView;
