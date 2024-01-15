const decode = require("jwt-decode");
const CooperativeDoctor = require("../models/cooperative-doctor.model");

const getCooperativeDoctors = async (req, res) => {
  let doctors = await CooperativeDoctor.find().populate("primaryFacility");

  if (doctors) {
    res.status(200).json(doctors);
  } else {
    res.status(400).json();
  }
};

const getCooperativeDoctor = async (req, res) => {
  let doctor = await CooperativeDoctor.findById(req.params.id).populate(
    "primaryFacility"
  );

  if (doctor) {
    res.status(200).json(doctor);
  } else {
    res.status(400).json();
  }
};

const getNewCooperativeDoctors = async (req, res) => {
  try {
    const newCoopDoctors = await CooperativeDoctor.find()
      .sort({ createdAt: -1 })
      .populate("primaryFacility")
      .limit(5);
      

    res.status(200).json(newCoopDoctors);
  } catch (error) {
    res.status(400).json();
  }
};

const createCooperativeDoctor = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.createdBy = token.user.name;

  req.body.primaryPhone
    ? req.body.phoneNumbers.push(req.body.primaryPhone)
    : null;
  let doctor = await CooperativeDoctor.create(req.body);
  res.status(201).json(doctor);
};

const updateCooperativeDoctor = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.updatedBy = token.user.name;

  req.body.primaryPhone
    ? (req.body.phoneNumbers = [req.body.primaryPhone])
    : (req.body.phoneNumbers = []);
  req.body.secondaryPhones
    ? req.body.phoneNumbers.push(req.body.secondaryPhones)
    : null;
  let doctor = await CooperativeDoctor.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).json(doctor);
};

const deleteCooperativeDoctor = async (req, res) => {
  await CooperativeDoctor.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Cooperative doctor deleted successfully" });
};

module.exports = {
  getCooperativeDoctors,
  getCooperativeDoctor,
  getNewCooperativeDoctors,
  createCooperativeDoctor,
  updateCooperativeDoctor,
  deleteCooperativeDoctor,
};
