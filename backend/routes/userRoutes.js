const router = require("express").Router();
const userService = require("../services/userService");

router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userService.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/:id/getCart", async (req, res) => {
  try {
    const cart = await userService.getCart(req.params.id);
    res.json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/cart/addProduct", async (req, res) => {
  const { userId, productId, amount } = req.body;
  try {
    const result = await userService.addToCart(userId, productId, amount);
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Ta bort ett specifikt item från varukorgen
router.delete("/cart/row/:rowId", async (req, res) => {
  try {
    const db = require("../models");
    const CartRow = db.cart_row || db.Cart_row || db.Cart_rows || db.cart_rows;

    // Raderar raden i databasen som matchar id:et
    await CartRow.destroy({ where: { id: req.params.rowId } });
    res.json({ message: "Produkten är borttagen" });
  } catch (err) {
    console.error("Fel vid borttagning av rad:", err);
    res.status(500).json({ error: "Kunde inte ta bort produkt" });
  }
});

router.delete("/:userId/cart/clear", async (req, res) => {
  try {
    const db = require("../models");
    const Cart = db.cart || db.Cart || db.carts || db.Carts;
    const CartRow = db.cart_row || db.Cart_row || db.Cart_rows || db.cart_rows;

    // Leta upp användarens pågående obetalda varukorg
    const activeCart = await Cart.findOne({
      where: { user_id: req.params.userId, payed: false },
    });

    if (activeCart) {
      // Ta bort rader som tillhör just den här varukorgen
      await CartRow.destroy({ where: { cart_id: activeCart.id } });
    }

    res.json({ message: "Kundvagnen har rensats" });
  } catch (err) {
    console.error("Fel vid rensning av korg:", err);
    res.status(500).json({ error: "Kunde inte rensa korgen" });
  }
});

module.exports = router;
