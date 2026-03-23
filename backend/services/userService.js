const db = require("../models");

module.exports = {
  getAll: async () => {
    return await db.users.findAll();
  },

  getById: async (id) => {
    return await db.users.findByPk(id);
  },

  create: async (data) => {
    return await db.users.create(data);
  },

  // Hämtar varukorg
  getCart: async (userId) => {
    const cart = await db.cart.findOne({
      where: { user_id: userId, payed: false },
      include: [
        {
          model: db.cart_row, //
          include: [db.product], //
        },
      ],
    });
    return cart;
  },

  // Lägger till produkt i varukorgen
  addToCart: async (userId, productId, amount) => {
    // Hittar eller skapar en aktiv varukorg
    let [cart] = await db.cart.findOrCreate({
      where: { user_id: userId, payed: false },
    });

    return await db.cart_row.create({
      cart_id: cart.id,
      product_id: productId,
      amount: amount,
    });
  },
  // Markerar varukorgen som betald vid utcheckning
  checkout: async (userId) => {
    return await db.cart.update(
      { payed: true },
      { where: { user_id: userId, payed: false } }
    );
  },
};
