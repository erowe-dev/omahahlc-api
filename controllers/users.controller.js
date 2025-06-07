const decode = require("jwt-decode");
const User = require("../models/user.model");
const Roles = require("../models/role.model");

const getUser = async (req, res) => {
  let body = decode(req.headers.authorization);
  let user = await User.findOne({ _id: body.user._id }, "-password");

  res.status(200).json(user);
};

const getUsers = async (req, res) => {
  let users = await User.find({}, "-password").sort({ name: 1 });

  res.status(200).json(users);
};

const getUserMenu = async (req, res) => {
  let user = await User.findById(
    decode(req.headers.authorization).user._id,
    "-password"
  );

  let permissions = await Roles.findOne(
    { name: user.role },
    "permissions"
  ).then((role) => role.permissions);

  let menuItems = [];

  const menuConfig = [
    {
      id: "home",
      title: "Dashboard",
      type: "basic",
      icon: "mat_outline:house",
      link: "/home",
      permission: null, // always visible
    },
    {
      id: "presentations",
      title: "Presentations",
      type: "basic",
      icon: "heroicons_outline:academic-cap",
      link: "presentations",
      permission: "presentations:view",
    },
    {
      id: "cooperative-doctors",
      title: "Cooperative Doctors",
      type: "basic",
      icon: "mat_outline:medical_services",
      link: "cooperative-doctors",
      permission: "cooperative-doctors:view",
    },
    {
      id: "prospective-doctors",
      title: "Prospective Doctors",
      type: "basic",
      icon: "heroicons_outline:user-group",
      link: "prospective-doctors",
      permission: "prospective-doctors:view",
    },
    {
      id: "hospitals",
      title: "Hospitals",
      type: "basic",
      icon: "heroicons_outline:office-building",
      link: "hospitals",
      permission: "hospitals:view",
    },
    {
      id: "user-management",
      title: "User Management",
      type: "basic",
      icon: "mat_outline:manage_accounts",
      link: "user-management",
      permission: "users:view",
    },
  ];

  console.log("User permissions:", permissions);

  // Always include items with permission: null, otherwise check permissions
  menuItems = menuConfig.filter((item) => {
    if (!item.permission) return true;
    return permissions.includes(item.permission);
  });

  res.status(200).json({ default: menuItems });
};

module.exports = {
  getUser,
  getUsers,
  getUserMenu,
};
