const Wishlist = require("../db/models/wishlist"); // Ensure the path is correct

const addEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const newEmail = await Wishlist.create({ email });
    res.status(201).json(newEmail);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEmail };
