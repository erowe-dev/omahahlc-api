const decode = require("jwt-decode");

const getUser = async (req, res) => {
  let body = decode(req.headers.authorization);

  res.status(200).json(body.user);
};

const getUserMenu = async (req, res) => {
  let roles = decode(req.headers.authorization).user.roles;
  let menuItems = [];

  if (
    roles.includes("admin") ||
    roles.includes("cooperativeDoctorCoordinator")
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
    ];
  } else if (roles.includes("member")) {
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

module.exports = {
  getUser,
  getUserMenu,
};
