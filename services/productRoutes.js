// anropas när någon klickar på "skicka betyg"
router.post("/:id/rate", async (req, res) => {
  try {
    const data = await productService.addRating(req.params.id, req.body.rating);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});
