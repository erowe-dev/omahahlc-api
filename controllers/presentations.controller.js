const decode = require("jwt-decode");
const Presentation = require("../models/presentation.model");

const getPresentations = async (req, res) => {
  let userId = req.query.userId;
  let prospectiveDoctorId = req.query.prospectiveDoctorId;
  let hospitalId = req.query.hospitalId;

  if (userId !== undefined) {
    let presentations = await Presentation.find({
      assignedMembers: userId,
    }).populate("assignedMembers");
    res.status(200).json(presentations);
  } else if (prospectiveDoctorId !== undefined) {
    let presentations = await Presentation.find({
      prospectiveDoctorId: prospectiveDoctorId,
    }).populate("assignedMembers");
    res.status(200).json(presentations);
  } else if (hospitalId !== undefined) {
    let presentations = await Presentation.find({
      hospitalId: hospitalId,
    }).populate("assignedMembers");
    res.status(200).json(presentations);
  }
};

const createPresentation = async (req, res) => {
  var token = decode(req.headers.authorization);

  let presentation = new Presentation(req.body);
  presentation.createdBy = token.user.name;

  await presentation
    .save()
    .then((presentation) => {
      res.status(201).json(presentation);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const deletePresentation = async (req, res) => {
  await Presentation.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Presentation deleted successfully" });
};

module.exports = {
  getPresentations,
  createPresentation,
  deletePresentation,
};
