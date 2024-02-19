/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Operations related to user favorites
 */

const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

const fetchuser = require("../middleware/fetchuser");

/**
 * @swagger
 * /api/favorites/addToFavorites/{productId}:
 *   post:
 *     summary: Add a product to user favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to add to favorites
 *     responses:
 *       '201':
 *         description: Product successfully added to favorites
 *         content:
 *           application/json:
 *             example:
 *               - userId1
 *               - userId2
 *       '400':
 *         description: Product is already in favorites or invalid product ID
 *         content:
 *           application/json:
 *             example:
 *               message: "Product is already in favorites"
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/addToFavorites/:productId", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the product is already in favorites
    if (product.favorites.includes(userId)) {
      return res
        .status(400)
        .json({ message: "Product is already in favorites" });
    }

    // Add the user to favorites
    product.favorites.push(userId);

    const updatedProduct = await product.save();

    res.status(201).json(updatedProduct.favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/favorites/getFavorites:
 *   get:
 *     summary: Get user's favorite products
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved user's favorite products
 *         content:
 *           application/json:
 *             example:
 *               - _id: "productID"
 *                 image: "productImageURL"
 *                 name: "productName"
 *                 productType: "productCategory"
 *                 price: 10.99
 *                 description: "Product description"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

router.get("/getFavorites", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    const favoriteProducts = await Product.find({ favorites: userId });

    res.status(200).json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Remove a product from favorites

/**
 * @swagger
 * /api/favorites/removeFromFavorites/{productId}:
 *   delete:
 *     summary: Remove a product from user favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the product to remove from favorites
 *     responses:
 *       '200':
 *         description: Product successfully removed from favorites
 *         content:
 *           application/json:
 *             example:
 *               - userId1
 *               - userId2
 *       '400':
 *         description: Product is not in favorites or invalid product ID
 *         content:
 *           application/json:
 *             example:
 *               message: "Product is not in favorites"
 *       '404':
 *         description: Product not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Product not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
router.delete(
  "/removeFromFavorites/:productId",
  fetchuser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      const productId = req.params.productId;

      console.log("User ID:", userId);
      console.log("Product ID:", productId);

      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if the product is in favorites
      if (!product.favorites.includes(userId)) {
        return res.status(400).json({ message: "Product is not in favorites" });
      }

      // Remove the user from favorites

      product.favorites = product.favorites.filter(
        (fav) => fav.toString() !== userId
      );

      console.log("Updated Favorites:", product.favorites);

      const updatedProduct = await product.save();

      res.status(200).json(updatedProduct.favorites);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

module.exports = router;
