const decode = require("jwt-decode");
const ProspectiveDoctor = require("../models/prospective-doctor.model");

const getProspectiveDoctors = async (req, res) => {
  let doctors = await ProspectiveDoctor.find().populate("primaryFacility");

  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400).json();
  }
};

const getProspectiveDoctor = async (req, res) => {
  let doctor = await ProspectiveDoctor.findById(req.params.id).populate(
    "primaryFacility"
  );

  if (doctor) {
    res.status(200).json(doctor);
  } else {
    res.status(400).json();
  }
};

const createProspectiveDoctor = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.createdBy = token.user.name;

  let doctor = await ProspectiveDoctor.create(req.body);
  res.status(201).json(doctor);
};

const updateProspectiveDoctor = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.updatedBy = token.user.name;

  let doctor = await ProspectiveDoctor.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(doctor);
};

const deleteProspectiveDoctor = async (req, res) => {
  await ProspectiveDoctor.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Prospective doctor deleted successfully" });
};

module.exports = {
  getProspectiveDoctors,
  getProspectiveDoctor,
  createProspectiveDoctor,
  updateProspectiveDoctor,
  deleteProspectiveDoctor,
};
