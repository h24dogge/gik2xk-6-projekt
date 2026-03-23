import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    imageUrl: "",
  });
  const [editId, setEditId] = useState(null); // Om vi ändrar en befintlig produkt

  const fetchProducts = () => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Spara-knappen hanterar både nya och ändringar
  const handleSave = () => {
    if (editId) {
      // Ändra (PUT)
      axios
        .put(`http://localhost:3001/api/products/${editId}`, form)
        .then(() => {
          alert("Produkten är uppdaterad!");
          clearForm();
        });
    } else {
      // Skapa ny (POST)
      axios.post("http://localhost:3001/api/products", form).then(() => {
        alert("Ny produkt tillagd!");
        clearForm();
      });
    }
  };

  const clearForm = () => {
    setForm({ title: "", description: "", price: "", imageUrl: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleDelete = (id) => {
    if (window.confirm("Vill du verkligen ta bort denna?")) {
      axios
        .delete(`http://localhost:3001/api/products/${id}`)
        .then(() => fetchProducts());
    }
  };

  const prepareEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      price: p.price,
      imageUrl: p.imageUrl,
    });
    setEditId(p.id);
  };

  return (
    <Stack spacing={4}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">
          {editId ? "Ändra produkt" : "Lägg till ny produkt"}
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Titel"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="Beskrivning"
            multiline
            rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <TextField
            label="Pris"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <TextField
            label="Bild-URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          <Button variant="contained" onClick={handleSave}>
            {editId ? "Spara ändringar" : "Skapa produkt"}
          </Button>
          {editId && (
            <Button onClick={clearForm} color="inherit">
              Avbryt ändring
            </Button>
          )}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Lagerlista</Typography>
        <List>
          {products.map((p) => (
            <React.Fragment key={p.id}>
              <ListItem
                secondaryAction={
                  <>
                    <IconButton onClick={() => prepareEdit(p)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(p.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={p.title} secondary={`${p.price} kr`} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Stack>
  );
}

export default Admin;
