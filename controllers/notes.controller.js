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

const getInteractionStatistics = async (req, res) => {
  let prospectiveNotes = await Note.find({
    prospectiveDoctorId: { $ne: null },
    noteType: { $ne: "note" },
  }).then((notes) => {
    let month = new Date().getMonth();
    let notesThisMonth = notes.filter(
      (note) => new Date(note.createdAt).getMonth() === month
    );
    return notesThisMonth;
  });

  let contactMethods = {
    phone: 0,
    email: 0,
    text: 0,
    inPerson: 0,
  };

  prospectiveNotes.forEach((note) => {
    if (note.contactMethod === "phone") {
      contactMethods.phone++;
    } else if (note.contactMethod === "email") {
      contactMethods.email++;
    } else if (note.contactMethod === "text") {
      contactMethods.text++;
    } else if (note.contactMethod === "in-person") {
      contactMethods.inPerson++;
    }
  });

  res.status(200).json(contactMethods);
};

const createNote = async (req, res) => {
  var token = decode(req.headers.authorization);

  let note = new Note(req.body);
  note.createdBy = token.user.name;

  await note
    .save()
    .then((note) => {
      res.status(201).json(note);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Note deleted successfully" });
};

module.exports = {
  getNotes,
  getStatistics: getInteractionStatistics,
  createNote,
  deleteNote,
};
