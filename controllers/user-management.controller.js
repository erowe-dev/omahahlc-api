const Users = require("../models/user.model");
const Permissions = require("../models/permission.model");
const Roles = require("../models/role.model");

const createUser = async (req, res) => {
  await Users.create(req.body)
    .then(() => {
      res.status(201).json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const getPermissions = async (req, res) => {
  let permissions = await Permissions.find({}, "-_id -__v")
    .sort({ name: 1 })
    .lean();
  res.status(200).json(permissions);
};

const getRoles = async (req, res) => {
  let roles = await Roles.find({}).sort({ name: 1 });
  res.status(200).json(roles);
};

const updateRolePermissions = async (req, res) => {
  try {
    let updateRequests = req.body.updates;

    for (let i = 0; i < updateRequests.length; i++) {
      let roleId = updateRequests[i].roleId;
      let permissionKey = updateRequests[i].permissionKey;

      if (updateRequests[i].operation === "add") {
        await Roles.updateOne(
          { _id: roleId },
          { $addToSet: { permissions: permissionKey } }
        );
      } else {
        await Roles.updateOne(
          { _id: roleId },
          { $pull: { permissions: permissionKey } }
        );
      }
    }

    return res
      .status(200)
      .json({ message: "Permissions updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
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
  getPermissions,
  getRoles,
  resetPassword,
  updateRolePermissions,
  updateUser,
};
