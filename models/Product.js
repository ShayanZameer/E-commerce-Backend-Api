const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  productType: { type: String, required: true, index: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  reviews: { type: Array, default: [] },

  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
