const Wishlist = require("../db/models/wishlist"); // Ensure the path is correct

const addEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const existingEmail = await Wishlist.findOne({ where: { email } });

    if (existingEmail) {
      return res
        .status(409)
        .json({ message: "Email already exists in our database" });
    } else {
      const newEmail = await Wishlist.create({ email });
      res.status(201).json(newEmail);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEmail };
