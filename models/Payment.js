const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentAmount: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
