const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise"); // Importera mysql för att skapa databasen direkt

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const PORT = 3001;

async function startServer() {
  try {
    // Anslut till MySQL
    console.log("Letar efter databasen...");
    const connection = await mysql.createConnection({
      host: "127.0.0.1",
      port: 3306,
      user: "root",
      password: "",
    });

    // Skapa databasen om den inte redan finns
    await connection.query("CREATE DATABASE IF NOT EXISTS `webbshop`;");
    console.log("✅ Databasen 'webbshop' är redo!");

    // Stäng den tillfälliga anslutningen
    await connection.end();

    // importera sequelize modellerna
    const db = require("./models");

    // Importera routes
    const productRoutes = require("./routes/productRoutes");
    const userRoutes = require("./routes/userRoutes");

    // Koppla routes
    app.use("/api/products", productRoutes);
    app.use("/api/users", userRoutes);

    // Synka tabellerna
    await db.sequelize.sync({ alter: true });
    console.log("Tabellerna är synkade!");

    // Skapa testanvändaren om den inte redan finns
    const User = db.user || db.User || db.users || db.Users;
    const count = await User.count();

    if (count === 0) {
      await User.create({
        id: 1,
        first_name: "Test",
        last_name: "Testsson",
        email: "test@test.se",
        password: "123",
      });
      console.log("✅ Skapade testanvändare (ID 1) automatiskt!");
    }

    // Starta webbservern!
    app.listen(PORT, () => {
      console.log(`Servern är igång på http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Ett fel uppstod när servern skulle starta:", err);
  }
}

// Kör igång funktionen
startServer();
