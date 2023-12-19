const Users = require("../models/user.model");

const createUser = async (req, res) => {
  await Users.create(req.body)
    .then(() => {
      res.status(201).json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const updateUser = async (req, res) => {
  let userId = req.params.id;

  let user = await Users.findOne({ _id: userId }, "-password");

  user.name = req.body.name;
  user.role = req.body.role;
  user.phone = req.body.phone;
  user.email = req.body.email;

  user
    .save()
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const resetPassword = async (req, res) => {
  let userId = req.params.id;

  let user = await Users.findOne({ _id: userId });

  user.password = req.body.password;

  user
    .save()
    .then(() => {
      res.status(200).json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

module.exports = {
  createUser,
  updateUser,
  resetPassword,
};
