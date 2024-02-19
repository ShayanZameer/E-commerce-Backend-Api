/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management operations
 */

const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

const multer = require("multer");

let storage = multer.memoryStorage(); // Use memory storage to store image as Buffer

let upload = multer({
  storage: storage,
});

// Route to create a new product

/**
 * @swagger
 * /api/product/addProduct:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL of the product image
 *               name:
 *                 type: string
 *                 description: Name of the product
 *               productType:
 *                 type: string
 *                 description: Type or category of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *               description:
 *                 type: string
 *                 description: Description of the product
 *     responses:
 *       '201':
 *         description: Product successfully created
 *         content:
 *           application/json:
 *             example:
 *               _id: "productID"
 *               image: "productImageURL"
 *               name: "productName"
 *               productType: "productCategory"
 *               price: 10.99
 *               description: "Product description"
 *       '400':
 *         description: Please provide all required fields
 *         content:
 *           application/json:
 *             example:
 *               message: "Please provide all required fields."
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */

router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    // console.log("Request received:", req.file, req.body);
    const { name, productType, description } = req.body;

    const price = Number(req.body.price);

    if (isNaN(price)) {
      return res.status(400).json({ message: "Invalid price value." });
    }

    if (!req.file || !name || !productType || !price || !description) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Access the image buffer from the request
    const imageBuffer = req.file.buffer;

    const newProduct = new Product({
      name,
      productType,
      price,
      description,
      image: imageBuffer.toString("base64"), // Convert the buffer to base64
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product data
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Display all The products

/**
 * @swagger
 * /api/product/displayAllProducts:
 *   get:
 *     summary: Display all products
 *     tags: [Product]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all products
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
router.get("/displayAllProducts", async (req, res) => {
  try {
    console.log("Fetching all products...");
    const DisplayProducts = await Product.find();

    res.status(200).json(DisplayProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/product/displayProductsByProductType/{productType}:
 *   get:
 *     summary: Display products by product type
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: productType
 *         required: true
 *         schema:
 *           type: string
 *         description: Type or category of the products to retrieve
 *     responses:
 *       '200':
 *         description: Successfully retrieved products by product type
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
router.get("/displayProductsByProductType/:productType", async (req, res) => {
  const productType = req.params.productType;

  try {
    const productsByType = await Product.find({ productType });
    res.status(200).json(productsByType);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
