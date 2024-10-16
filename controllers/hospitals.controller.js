const decode = require("jwt-decode");
const Hospital = require("../models/hospital.model");

const getHospitals = async (req, res) => {
  let hospitals = await Hospital.find();

  if (hospitals) {
    res.status(200).json(hospitals);
  } else {
    res.status(400).json();
  }
};

const getHospital = async (req, res) => {
  let hospital = await Hospital.findById(req.params.id)
    .populate("assignedHlcMembers")
    .populate("assignedPvgMembers");

  if (hospital) {
    res.status(200).json(hospital);
  } else {
    res.status(400).json();
  }
};

const createHospital = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.createdBy = token.user.name;

  let hospital = await Hospital.create(req.body);

  hospital.createdBy = req.user._id;

  res.status(201).json(hospital);
};

const updateHospital = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.updatedBy = token.user.name;

  let hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("assignedHlcMembers")
    .populate("assignedPvgMembers");

  hospital.updatedBy = req.user._id;

  res.status(200).json(hospital);
};

const deleteHospital = async (req, res) => {
  await CooperativeDoctor.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Hospital deleted successfully" });
};

module.exports = {
  getHospitals,
  getHospital,
  createHospital,
  updateHospital,
  deleteHospital,
};
