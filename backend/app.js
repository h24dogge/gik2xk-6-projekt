const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Importera routes [cite: 198]
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Koppla routes [cite: 63]
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Synka med XAMPP och starta [cite: 60]
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Databasen är redo!");
  app.listen(PORT, () =>
    console.log(`Server körs på http://localhost:${PORT}`)
  );
});
