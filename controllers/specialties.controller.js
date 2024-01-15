const decode = require("jwt-decode");
const CooperativeDoctor = require("../models/cooperative-doctor.model");
const Specialty = require("../models/specialty.model");

const getSpecialties = async (req, res) => {
  let specialties = await Specialty.find();
  if (specialties) {
    res.status(200).json(specialties);
  } else {
    res.status(400).json();
  }
};

const getSpecialtiesNeeded = async (req, res) => {
  let specialties = await Specialty.find()
    .sort({ numberOfCooperativeDoctors: 1 })
    .limit(5);

  // uncomment to update the count
  // for (let i = 0; i < specialties.length; i++) {
  //   let specialty = specialties[i];
  //   specialty.numberOfCooperativeDoctors = await CooperativeDoctor.countDocuments({
  //     specialty: specialty.name,
  //   })
  //   specialty.save();
  // }

  res.status(200).json(specialties);
};

module.exports = {
  getSpecialties,
  getSpecialtiesNeeded,
};
