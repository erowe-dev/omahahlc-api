const decode = require("jwt-decode");
const Note = require("../models/hospital.model");

const getNotes = async (req, res) => {
  let entityType = req.params.entity;
  let entityId = req.params.id;

  if (entityType === "facility") {
    let notes = await Note.find({ facilityId: entityId });
    res.status(200).json(notes);
  } else if (entityType === "cooperativeDoctor") {
    let notes = await Note.find({ cooperativeDoctorId: entityId });
    res.status(200).json(notes);
  } else if (entityType === "prospectiveDoctor") {
    let notes = await Note.find({ prospectiveDoctorId: entityId });
    res.status(200).json(notes);
  } else {
    res.status(400).json({ message: "Invalid entity type" });
  }
};

const createNote = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.createdBy = token.user.name;

  let note = new Note(req.body);
  await note.save();

  res.status(201).json(note.id);
};

module.exports = {
  getNotes,
  createNote,
};
