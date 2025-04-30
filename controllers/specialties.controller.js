const stringSimilarity = require("string-similarity");
const CooperativeDoctor = require("../models/cooperative-doctor.model");
const ProspectiveDoctor = require("../models/prospective-doctor.model");
const Specialty = require("../models/specialty.model");

const getSpecialties = async (req, res) => {
  let specialties = await Specialty.find().sort({ name: 1 });
  if (specialties) {
    res.status(200).json(specialties);
  } else {
    res.status(400).json();
  }
};

const getSpecialtiesNeeded = async (req, res) => {
  let specialties = await Specialty.find({
    includeInStatistics: true,
  })
    .sort({ numberOfCooperativeDoctors: 1 })
    .limit(8);

  //uncomment to update the count
  // for (let i = 0; i < specialties.length; i++) {
  //   let specialty = specialties[i];
  //   specialty.numberOfCooperativeDoctors = await CooperativeDoctor.countDocuments({
  //     primarySpecialty: specialty.name,
  //   })
  //   specialty.save();
  // }

  // await updateDoctorSpecialties(specialties);

  res.status(200).json(specialties);
};

const updateDoctorSpecialties = async (specialties) => {
  for (let i = 0; i < specialties.length; i++) {
    let specialty = specialties[i];
    specialty.numberOfCooperativeDoctors = 0;
    let doctors = await CooperativeDoctor.find({});
    for (let j = 0; j < doctors.length; j++) {
      let doctor = doctors[j];
      let similarity = stringSimilarity.compareTwoStrings(
        specialty.name,
        doctor.otherSpecialties
      );
      console.log(specialty.name, doctor.otherSpecialties, similarity);
      if (similarity > 0.8) {
        console.log(specialty.name, doctor.otherSpecialties, similarity);
        doctor.primarySpecialty = specialty.name;
        doctor.save();

        specialty.numberOfCooperativeDoctors++;
      }
    }
    specialty.save();
  }
};

module.exports = {
  getSpecialties,
  getSpecialtiesNeeded,
};
