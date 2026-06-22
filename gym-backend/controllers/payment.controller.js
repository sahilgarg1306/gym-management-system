const Payment = require('../models/Payment.model');

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.markPaid = async (req, res) => {
  try {

    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status: 'Paid' },
      { new: true }
    );

    res.json(payment);

  } catch (err) {
    res.status(500).json(err);
  }
};