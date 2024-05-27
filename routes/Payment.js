const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");

// Route to add a new payment
router.post("/add", async (req, res) => {
  try {
    const newPayment = new Payment({
      paymentAmount: req.body.paymentAmount
    });
    const savedPayment = await newPayment.save();
    res.status(201).send(savedPayment);
  } catch (error) {
    res.status(400).send(error);
  }
});



// Route to get the latest payment
router.get("/retrieveLatest", async (req, res) => {
    try {
      const latestPayment = await Payment.findOne().sort({ createdAt: -1 }); // Sorting by the createdAt field in descending order
      if (!latestPayment) {
        return res.status(404).json({ message: "No payments found" });
      }
      res.json(latestPayment);
    } catch (error) {
      console.error("Error retrieving latest payment:", error);
      res.status(500).json({ error: "Server error while retrieving latest payment" });
    }
  });

module.exports = router;
