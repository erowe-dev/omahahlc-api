const decode = require("jwt-decode");
const CompletedPresentation = require("../models/completed-presentation.model");
const PresentationContact = require("../models/presentation-contact.model");
const PresentationInvitation = require("../models/presentation-invitation.model");
const ScheduledPresentation = require("../models/scheduled-presentation.model");
const Checklist = require("../models/checklist.model");
const ChecklistItem = require("../models/checklist-item.model");

const getPresentationContacts = async (req, res) => {
  let presentationContacts = await PresentationContact.find().populate(
    "facility"
  );

  res.status(200).json(presentationContacts);
};

const getPresentationContact = async (req, res) => {
  let presentationContact = await PresentationContact.findById(
    req.params.id
  ).populate("facility");

  res.status(200).json(presentationContact);
};

const getPresentationInvitations = async (req, res) => {
  let query = req.query.contactId ? { contactId: req.query.contactId } : {};
  let presentationInvitations = await PresentationInvitation.find(
    query
  ).populate("contactedBy");

  res.status(200).json(presentationInvitations);
};

const getScheduledPresentations = async (req, res) => {
  let query = {};
  if (req.query.contactId) {
    query.contactId = req.query.contactId;
  }
  if (req.query.userId) {
    query = {
      assignedPresenters: { $in: [req.query.userId] },
    };
  }

  let scheduledPresentations = await ScheduledPresentation.find(query)
    .populate("assignedPresenter")
    .populate("contact")
    .populate("presentationChecklist")
    .sort({ scheduledDateTime: 1 });

  res.status(200).json(scheduledPresentations);
};

const getCompletedPresentations = async (req, res) => {
  let query = {};
  if (req.query.contactId) {
    query.contactId = req.query.contactId;
  }
  if (req.query.userId) {
    query = {
      assignedPresenters: { $in: [req.query.userId] },
    };
  }
  let completedPresentations = await CompletedPresentation.find(query).populate(
    "presenters"
  );

  res.status(200).json(completedPresentations);
};

const createPresentationContact = async (req, res) => {
  let presentationContact = new PresentationContact(req.body);

  await presentationContact.save();

  res.status(201).json(presentationContact);
};

const createPresentationInvitation = async (req, res) => {
  let presentationInvitation = new PresentationInvitation(req.body);

  await presentationInvitation.save();

  res.status(201).json(presentationInvitation);
};

const updatePresentationInvitation = async (req, res) => {
  await PresentationInvitation.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "Invitation updated" });
};

const createScheduledPresentation = async (req, res) => {
  await PresentationInvitation.findByIdAndUpdate(req.query.invitationId, {
    response: "accepted",
    scheduled: true,
  });

  let scheduledPresentation = new ScheduledPresentation(req.body);
  let newChecklist = new Checklist();
  let checklistItems = await ChecklistItem.find({
    type: "scheduledPresentation",
  });

  newChecklist.items = checklistItems.map((item) => ({
    description: item.description,
  }));

  await newChecklist.save();

  scheduledPresentation.presentationChecklist = newChecklist._id;

  await scheduledPresentation.save();

  res.status(201).json(scheduledPresentation);
};

const updateScheduledPresentation = async (req, res) => {
  await ScheduledPresentation.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "Presentation updated" });
};

const createCompletedPresentation = async (req, res) => {
  await ScheduledPresentation.findByIdAndUpdate(req.query.presentationId, {
    completed: true,
  });

  let completedPresentation = new CompletedPresentation(req.body);

  await completedPresentation.save();

  res.status(201).json(completedPresentation);
};

const updateCompletedPresentation = async (req, res) => {
  await CompletedPresentation.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({ message: "Presentation updated" });
};

// const setPresentationCompleted = async (req, res) => {
//   let completedPresentation = await CompletedPresentation.findOneAndUpdate(
//     { _id: req.params.id },
//     { completed: true }
//   );

//   res.status(200).json(completedPresentation);
// };

module.exports = {
  createCompletedPresentation,
  createPresentationContact,
  createPresentationInvitation,
  createScheduledPresentation,
  getCompletedPresentations,
  getPresentationContact,
  getPresentationContacts,
  getPresentationInvitations,
  getScheduledPresentations,
  updateCompletedPresentation,
  updatePresentationInvitation,
  updateScheduledPresentation,
};
