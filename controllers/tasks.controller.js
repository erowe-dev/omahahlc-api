const decode = require("jwt-decode");
const CompletedPresentation = require("../models/completed-presentation.model");
const PresentationInvitation = require("../models/presentation-invitation.model");
const ScheduledPresentation = require("../models/scheduled-presentation.model");

const getUserTasks = async (req, res) => {
  let body = decode(req.headers.authorization);

  let presentationInvitations = await PresentationInvitation.find({
    contactedBy: body.user._id,
  }).populate("contact");

  let scheduledPresentations = await ScheduledPresentation.find({
    assignedPresenter: body.user._id,
  }).populate("contact");

  let completedPresentations = await CompletedPresentation.find({
    presenters: { $in: [body.user._id] },
  }).populate("contact");

  let tasks = new Array();
  presentationInvitations.forEach((invitation) => {
    tasks.push({
      type: "followUp",
      id: invitation._id,
      date: invitation.followUpDate,
      title: `Invitation follow up with ${invitation.contact.contactName} `,
      allDay: true,
      url: `/presentations/details/${invitation.contact.id}`,
    });
  });

  scheduledPresentations.forEach((presentation) => {
    tasks.push({
      type: "presentation",
      id: presentation._id,
      date: presentation.scheduledDateTime,
      title: `Presentation with ${presentation.contact.contactName}`,
      allDay: false,
      url: `/presentations/details/${presentation.contact.id}`,
    });
  });

  completedPresentations.forEach((presentation) => {
    tasks.push({
      type: "followUp",
      id: presentation._id,
      date: presentation.followUpDate,
      title: `Post presentation follow up with ${presentation.contact.contactName}`,
      allDay: true,
      url: `/presentations/details/${presentation.contact.id}`,
    });
  });

  res.status(200).json(tasks);
};

module.exports = {
  getUserTasks,
};
