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

module.exports = router;
