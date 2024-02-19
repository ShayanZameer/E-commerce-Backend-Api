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
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const { ObjectId } = require("mongoose").mongo;
const cloudinary = require("cloudinary").v2;
// import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dkmrmhwum",
  api_key: "946847956626661",
  api_secret: "e84bTJa7c9hpEVgIgRJDrDeI1RM",
});

// Function to upload image to Cloudinary
const uploadToCloudinary = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { resource_type: "auto" }, // Use 'auto' to automatically determine the resource type (image, video, etc.)
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(file.buffer);
  });
};

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

// Create MongoDB connection
const conn = mongoose.createConnection(
  "mongodb+srv://alizadishah2:4XQ6riEEsTqENYlp@cluster0.bh9tzbc.mongodb.net/?retryWrites=true&w=majority"
);

let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db);
});

const storage = multer.memoryStorage(); // Use memory storage to store the image as a buffer

const upload = multer({ storage: storage });

// Route to create a new product
router.post("/addProduct", upload.single("image"), async (req, res) => {
  try {
    const { name, productType, description, imageType } = req.body;
    const price = Number(req.body.price);

    if (isNaN(price)) {
      return res.status(400).json({ message: "Invalid price value." });
    }

    if (!name || !productType || !price || !description || !imageType) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }
    let imageUrl; // Variable to store the image URL or base64 string

    if (imageType === "base64") {
      // Access the image buffer from the request and convert to base64
      const imageBuffer = req.file.buffer;

      // Check if the imageBuffer is present
      if (!imageBuffer) {
        console.error("Error: Image buffer is missing in req.file.");
        return res.status(500).json({ message: "Internal Server Error" });
      }

      // Convert the imageBuffer to base64
      const base64String = imageBuffer.toString("base64");

      // Log the base64String content
      console.log("Base64 String:", base64String);

      // Generate the data URL
      imageUrl = `data:${req.file.mimetype};base64,${base64String}`;

      const newProduct = new Product({
        name,
        productType,
        price,
        description,
        image: imageUrl,
        imageType,
      });

      // Save the new product to the database
      const savedProduct = await newProduct.save();

      // Respond with the saved product data
      res.status(201).json(savedProduct);
    }
    if (imageType === "cloudinary") {
      try {
        const cloudinaryUrl = await uploadToCloudinary(req.file);
        imageUrl = cloudinaryUrl;
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      const newProduct = new Product({
        name,
        productType,
        price,
        description,
        image: imageUrl,
        imageType,
      });

      // Save the new product to the database
      const savedProduct = await newProduct.save();

      // Respond with the saved product data
      res.status(201).json(savedProduct);
    }
    if (imageType === "gridfs") {
      // Create a write stream with the filename
      const writeStream = gfs.openUploadStream(req.file.originalname);

      // Pipe the file buffer to the write stream
      writeStream.end(req.file.buffer);

      // Handle finish event
      writeStream.on("finish", async () => {
        // Set the image URL to the route that serves the image from GridFS
        imageUrl = `/api/product/image/${req.file.originalname}`;

        const newProduct = new Product({
          name,
          productType,
          price,
          description,
          image: imageUrl,
          imageType,
        });

        // Save the new product to the database
        const savedProduct = await newProduct.save();

        // Respond with the saved product data
        res.status(201).json(savedProduct);
      });
    }
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
