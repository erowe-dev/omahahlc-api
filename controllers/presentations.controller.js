const decode = require("jwt-decode");
const CompletedPresentation = require("../models/completed-presentation.model");
const PresentationContact = require("../models/presentation-contact.model");
const PresentationInvitation = require("../models/presentation-invitation.model");
const ScheduledPresentation = require("../models/scheduled-presentation.model");

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
  let presentationInvitations = await PresentationInvitation.find(query);

  res.status(200).json(presentationInvitations);
};

const getScheduledPresentations = async (req, res) => {
  let scheduledPresentations = await ScheduledPresentation.find();

  res.status(200).json(scheduledPresentations);
};

const getCompletedPresentations = async (req, res) => {
  let completedPresentations = await CompletedPresentation.find();

  res.status(200).json(completedPresentations);
};

const createPresentationInvitation = async (req, res) => {
  let presentationInvitation = new PresentationInvitation(req.body);

  await presentationInvitation.save();

  res.status(201).json(presentationInvitation);
};

const createScheduledPresentation = async (req, res) => {
  let scheduledPresentation = new ScheduledPresentation(req.body);

  await scheduledPresentation.save();

  res.status(201).json(scheduledPresentation);
};

const createCompletedPresentation = async (req, res) => {
  let completedPresentation = new CompletedPresentation(req.body);

  await completedPresentation.save();

  res.status(201).json(completedPresentation);
};

module.exports = {
  createCompletedPresentation,
  createPresentationInvitation,
  createScheduledPresentation,
  getCompletedPresentations,
  getPresentationContact,
  getPresentationContacts,
  getPresentationInvitations,
  getScheduledPresentations,
};
