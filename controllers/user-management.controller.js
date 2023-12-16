const Users = require("../models/user.model");

const createUser = async (req, res) => {
  await Users.create(req.body);

  res.status(201);
};

const updateUser = async (req, res) => {
  let userId = req.params.id;

  let user = await Users.findOne({ _id: userId }, '-password');

  user.name = req.body.name;
  user.role = req.body.role;
  user.phone = req.body.phone;
  user.email = req.body.email;

  user.save().then(() => {
    res.status(200).json();
  });
};

const resetPassword = async (req, res) => {
  let userId = req.params.id;

  let user = await Users.findOne({ _id: userId });

  user.password = req.body.password;

  user.save().then(() => {
    res.status(200).json();
  });
};

module.exports = {
  createUser,
  updateUser,
  resetPassword,
};
