const Member = require('../models/Member.model');
const Payment = require('../models/Payment.model');

exports.createMember = async (req, res) => {

  try {

    const joiningDate = new Date(req.body.joiningDate);

    const expiryDate = new Date(joiningDate);

    // Membership valid for 1 month
    expiryDate.setMonth(expiryDate.getMonth() + 1);

    const member = await Member.create({
      ...req.body,
      expiryDate
    });

    const planPrices = {
      Basic: 499,
      Silver: 999,
      Gold: 1999
    };

    await Payment.create({
      memberId: member._id,
      memberName: member.name,
      plan: member.plan,
      amount: planPrices[member.plan] || 0,
      status: 'Pending'
    });

    res.status(201).json(member);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.getMembers = async (req, res) => {

  try {

    const members = await Member.find();

    res.status(200).json(members);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.updateMember = async (req, res) => {

  try {

    const member = await Member.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(member);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

exports.deleteMember = async (req, res) => {

  try {

    const memberId = req.params.id;

    await Member.findByIdAndDelete(memberId);

    await Payment.deleteMany({
      memberId: memberId
    });

    res.json({
      message: 'Member and payment removed'
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};

exports.renewMembership = async (req, res) => {

  try {

    const member = await Member.findById(req.params.id);

    if (!member) {

      return res.status(404).json({
        message: 'Member not found'
      });

    }

    const newExpiryDate = new Date(member.expiryDate);

    newExpiryDate.setMonth(newExpiryDate.getMonth() + 1);

    member.expiryDate = newExpiryDate;

    await member.save();

    const planPrices = {
      Basic: 499,
      Silver: 999,
      Gold: 1999
    };

    await Payment.create({
      memberId: member._id,
      memberName: member.name,
      plan: member.plan,
      amount: planPrices[member.plan] || 0,
      status: 'Pending'
    });

    res.status(200).json({
      message: 'Membership renewed successfully',
      member
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};