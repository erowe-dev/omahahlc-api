const nodemailer = require("nodemailer");
const users = require("../models/user.model");
const presentationInvitations = require("../models/presentation-invitation.model");
const completedPresentations = require("../models/completed-presentation.model");
const scheduledPresentations = require("../models/scheduled-presentation.model");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "email-smtp.us-east-1.amazonaws.com",
  port: 587, // Common port for SMTP
  secure: false, // Set to true if using port 465
  auth: {
    user: process.env.AWS_EMAIL_USER,
    pass: process.env.AWS_EMAIL_PASS,
  },
});

async function loadNotifications() {
  try {
    const currentDate = new Date();
    const startOfDay = new Date(currentDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(currentDate.setHours(23, 59, 59, 999));

    const invitationFollowUps = await presentationInvitations
      .find({
        response: "pending",
        followUpDate: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate("contact")
      .populate("contactedByUser");

    const scheduledPresentationFollowUps = await scheduledPresentations
      .find({
        completed: false,
        followUpDate: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate({
        path: "contact",
        options: { virtuals: true },
      })
      .populate("assignedPresenter");

    const completedPresentationFollowUps = await completedPresentations
      .find({
        followedUp: false,
        followUpDate: { $gte: startOfDay, $lte: endOfDay },
      })
      .populate({
        path: "contact",
        options: { virtuals: true },
      })
      .populate("presenters");

    const groupedNotifications = {};

    const allFollowUps = [
      ...invitationFollowUps.map((followUp) => ({
        contact: followUp.contact,
        contactedByUser: followUp.contactedByUser,
        type: "Invitation",
      })),
      ...scheduledPresentationFollowUps.map((followUp) => ({
        contact: followUp.contact,
        contactedByUser: followUp.assignedPresenter,
        type: "Scheduled Presentation",
      })),
      ...completedPresentationFollowUps.map((followUp) => ({
        contact: followUp.contact,
        contactedByUser: followUp.presenters[0],
        type: "Completed Presentation",
      })),
    ];

    for (const followUp of allFollowUps) {
      const userId = followUp.contactedByUser.id;
      if (!groupedNotifications[userId]) {
        groupedNotifications[userId] = {
          contactedByUser: followUp.contactedByUser,
          notifications: [],
        };
      }
      groupedNotifications[userId].notifications.push(followUp);
    }

    const notificationReminders = Object.values(groupedNotifications);

    if (process.env.NODE_ENV === "development") {
      console.log(
        "Notification Reminders:",
        JSON.stringify(notificationReminders)
      );
    }

    for (const groupedByUser of notificationReminders) {
      let emailText = `Hello ${groupedByUser.contactedByUser.name},\n\nThis is a reminder to follow up with the items below:\n\n`;
      for (const notification of groupedByUser.notifications) {
        emailText += `${notification.type} - ${notification.contact.contactName}: https://omahahlchelper.com/presentations/details/${notification.contact.id}\n`;
      }
      emailText += `\n\nHLC Helper`;

      if (groupedByUser.contactedByUser.email) {
        //const userEmail = groupedByUser.contactedByUser.email;
        const userEmail = process.env.REDIRECT_EMAIL;
        await sendNotificationEmail(
          userEmail,
          "Presentation Follow-Up Reminders",
          emailText
        );
      } else {
        console.error(
          `User ${groupedByUser.contactedByUser.name} does not have an email address.`
        );
      }
    }
  } catch (error) {
    console.error("Error loading notifications:", error);
  }
}

async function sendNotificationEmail(to, subject, text) {
  try {
    const mailOptions = {
      from: "HLC Helper <notifications@omahahlchelper.com>",
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  loadNotifications,
  sendNotificationEmail,
};
