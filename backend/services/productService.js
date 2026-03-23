const db = require("../models");

module.exports = {
  // Hämtar alla produkter OCH deras betyg (för stjärnor på startsidan)
  getAll: async () => {
    return await db.product.findAll({
      include: [db.rating],
    });
  },

  // Hämtar en specifik produkt OCH dess betyg
  getById: async (id) => {
    return await db.product.findByPk(id, {
      include: [db.rating],
    });
  },

  create: async (data) => {
    return await db.product.create(data);
  },

  update: async (id, data) => {
    const product = await db.product.findByPk(id);
    if (!product) return null;
    return await product.update(data);
  },

  delete: async (id) => {
    const product = await db.product.findByPk(id);
    if (!product) return null;
    return await product.destroy();
  },

  // Sparar ett nytt betyg i databasen
  addRating: async (productId, ratingValue) => {
    return await db.rating.create({
      product_id: productId,
      rating: ratingValue,
    });
  },
};
