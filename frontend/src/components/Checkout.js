import React, { useState } from "react";
import { Paper, Typography, TextField, Button, Stack } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ namn: "", email: "", kort: "" });

  const betala = () => {
    // Kallar på din nya checkout-route i backend
    axios.put("http://localhost:3001/api/users/1/checkout").then(() => {
      alert(`Betalning godkänd för ${info.namn}!`);
      navigate("/");
    });
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Kassa
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="Namn"
          onChange={(e) => setInfo({ ...info, namn: e.target.value })}
        />
        <TextField
          label="E-post"
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />
        <TextField
          label="Kortnummer"
          type="password"
          onChange={(e) => setInfo({ ...info, kort: e.target.value })}
        />
        <Button variant="contained" color="success" onClick={betala}>
          Betala Köp
        </Button>
      </Stack>
    </Paper>
  );
}
export default Checkout;
