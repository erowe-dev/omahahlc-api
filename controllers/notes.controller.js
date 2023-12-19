const decode = require("jwt-decode");
const Note = require("../models/note.model");

const getNotes = async (req, res) => {
  let entityId = req.query.id;
  let entityType = req.query.entity;

  if (entityType === "facility") {
    let notes = await Note.find({ facilityId: entityId });
    res.status(200).json(notes);
  } else if (entityType === "cooperative-doctor") {
    let notes = await Note.find({ cooperativeDoctorId: entityId });
    res.status(200).json(notes);
  } else if (entityType === "prospective-doctor") {
    let notes = await Note.find({ prospectiveDoctorId: entityId });
    res.status(200).json(notes);
  } else {
    res.status(400).json({ message: "Invalid entity type" });
  }
};

const createNote = async (req, res) => {
  var token = decode(req.headers.authorization);
  req.body.createdBy = token.user.name;

  let note = await Note.create(req.body).catch((err) => {
    res.status(500).json(err);
  });

  res.status(201).json(note);
};

module.exports = {
  getNotes,
  createNote,
};
