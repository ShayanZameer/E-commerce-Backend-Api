const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  paymentAmount: { // Using camelCase for JavaScript consistency
    type: String,
    required: true
  }
});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
