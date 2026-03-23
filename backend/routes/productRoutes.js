const router = require("express").Router();
const productService = require("../services/productService");

// Hämta alla produkter
router.get("/", async (req, res) => {
  const products = await productService.getAll();
  res.json(products);
});

// Hämta en specifik produkt (viktigt för detaljsidan)
router.get("/:id", async (req, res) => {
  const product = await productService.getById(req.params.id);
  res.json(product);
});

// SKAPA NYTT BETYG - Det var denna som saknades och gav 404!
router.post("/:id/rate", async (req, res) => {
  try {
    const productId = req.params.id;
    const ratingValue = req.body.rating;
    const newRating = await productService.addRating(productId, ratingValue);
    res.json(newRating);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte spara betyg", error: err });
  }
});

// Skapa produkt (Admin)
router.post("/", async (req, res) => {
  const newP = await productService.create(req.body);
  res.json(newP);
});

// Uppdatera produkt (Admin)
router.put("/:id", async (req, res) => {
  const updated = await productService.update(req.params.id, req.body);
  res.json(updated);
});

// Ta bort produkt (Admin)
router.delete("/:id", async (req, res) => {
  await productService.delete(req.params.id);
  res.json({ message: "Produkt borttagen" });
});

module.exports = router;
