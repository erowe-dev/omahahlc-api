const decode = require("jwt-decode");
const User = require("../models/user.model");

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
  let role = decode(req.headers.authorization).user.role;
  let menuItems = [];

  if (
    role.toLowerCase().includes("admin") ||
    role === "cooperativeDoctorCoordinator"
  ) {
    menuItems = [
      {
        id: "home",
        title: "Dashboard",
        type: "basic",
        icon: "mat_outline:house",
        link: "/home",
      },
      {
        id: "presentations",
        title: "Presentations",
        type: "basic",
        icon: "heroicons_outline:academic-cap",
        link: "presentations",
      },
      {
        id: "cooperative-doctors",
        title: "Cooperative Doctors",
        type: "basic",
        icon: "mat_outline:medical_services",
        link: "cooperative-doctors",
      },
      {
        id: "prospective-doctors",
        title: "Prospective Doctors",
        type: "basic",
        icon: "heroicons_outline:user-group",
        link: "prospective-doctors",
      },
      {
        id: "hospitals",
        title: "Hospitals",
        type: "basic",
        icon: "heroicons_outline:office-building",
        link: "hospitals",
      },
      {
        id: "user-management",
        title: "User Management",
        type: "basic",
        icon: "mat_outline:manage_accounts",
        link: "user-management",
      },
    ];
  } else if (role === "member") {
    menuItems = [
      {
        id: "home",
        title: "Dashboard",
        type: "basic",
        icon: "mat_outline:house",
        link: "/home",
      },
      {
        id: "cooperative-doctors",
        title: "Cooperative Doctors",
        type: "basic",
        icon: "mat_outline:medical_services",
        link: "cooperative-doctors",
      },
    ];
  } else if (role === "pvg") {
    menuItems = [
      {
        id: "hospitals",
        title: "Hospitals",
        type: "basic",
        icon: "heroicons_outline:office-building",
        link: "hospitals",
      },
    ];
  } else {
    menuItems = [
      {
        id: "home",
        title: "Dashboard",
        type: "basic",
        icon: "mat_outline:house",
        link: "/home",
      },
      {
        id: "presentations",
        title: "Presentations",
        type: "basic",
        icon: "heroicons_outline:academic-cap",
        link: "presentations",
      },
      {
        id: "cooperative-doctors",
        title: "Cooperative Doctors",
        type: "basic",
        icon: "mat_outline:medical_services",
        link: "cooperative-doctors",
      },
      {
        id: "prospective-doctors",
        title: "Prospective Doctors",
        type: "basic",
        icon: "heroicons_outline:user-group",
        link: "prospective-doctors",
      },
      {
        id: "hospitals",
        title: "Hospitals",
        type: "basic",
        icon: "heroicons_outline:office-building",
        link: "hospitals",
      },
    ];
  }

  res.status(200).json({ default: menuItems });
};

module.exports = {
  getUser,
  getUsers,
  getUserMenu,
};
