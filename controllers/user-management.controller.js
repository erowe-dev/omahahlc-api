const Users = require("../models/user.model");

const resetPassword = async (req, res) => {
  let userId = req.params.id;

  let user = await Users.findOne({ _id: userId });

  user.password = req.body.password;

  user.save().then(() => {
    res.status(200).json();
  });
};

module.exports = {
  resetPassword,
};
