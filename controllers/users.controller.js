const decode = require("jwt-decode");
const Users = require("../models/user.model");

const getUser = async (req, res) => {
  let body = decode(req.headers.authorization);

  res.status(200).json(body.user);
};

const getUsers = async (req, res) => {
  let users = await Users.find({});

  res.status(200).json(users);
};

const getUserMenu = async (req, res) => {
  let role = decode(req.headers.authorization).user.role;
  let menuItems = [];

  if (
    role === "admin" ||
    role === "cooperativeDoctorCoordinator") {
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
        id: "appointments",
        title: "My Appointments",
        type: "basic",
        icon: "heroicons_outline:calendar",
        link: "my-appointments",
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
      {
        id: "appointments",
        title: "My Appointments",
        type: "basic",
        icon: "heroicons_outline:calendar",
        link: "my-appointments",
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

const updatePassword = async (req, res) => {
  let body = decode(req.headers.authorization);

  res.status(200).json(body.user);
};

module.exports = {
  getUser,
  getUsers,
  getUserMenu,
  updatePassword,
};
