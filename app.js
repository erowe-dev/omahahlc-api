require("dotenv").config();

const cors = require("cors");
const cron = require("node-cron");
const express = require("express");
const mailManager = require("./managers/mail-manager");
const mongoose = require("mongoose");

const passport = require("passport");

const authRouter = require("./routes/auth.routes");
const checklistsRouter = require("./routes/checklists.routes");
const completedPresentationsRouter = require("./routes/completed-presentations.routes");
const cooperativeDoctorsRouter = require("./routes/cooperative-doctors.routes");
const filesRouter = require("./routes/files.routes");
const hospitalsRouter = require("./routes/hospitals.routes");
const notesRouter = require("./routes/notes.routes");
const presentationContactsRouter = require("./routes/presentation-contacts.routes");
const presentationInvitationsRouter = require("./routes/presentation-invitations.routes");
const prospectiveDoctorsRouter = require("./routes/prospective-doctors.routes");
const scheduledPresentationsRouter = require("./routes/scheduled-presentations.routes");
const specialtiesRouter = require("./routes/specialties.routes");
const tasksRouter = require("./routes/tasks.routes");
const userManagmentRouter = require("./routes/user-management.routes");
const usersRouter = require("./routes/users.routes");

const port = process.env.PORT || 3001;
const dbConnectionString = process.env.MongoURI;

mongoose.connect(dbConnectionString);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

require("./auth/auth");
const app = express();

cron.schedule("0 7 * * *", () => {
  console.log("Running a task every day at 7am");
  mailManager
    .loadNotifications()
    .then(() => {
      console.log("Notifications sent successfully");
    })
    .catch((error) => {
      console.error("Error sending notifications:", error);
    });
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set up CORS
app.use(cors({ origin: "*" }));

// Auth route doesn't need authentication
app.use("/auth", authRouter);

// Helper function to apply JWT authentication to routes
const authenticatedRoute = (path, router) => {
  app.use(path, passport.authenticate("jwt", { session: false }), router);
};

authenticatedRoute("/checklists", checklistsRouter);
authenticatedRoute("/completed-presentations", completedPresentationsRouter);
authenticatedRoute("/cooperative-doctors", cooperativeDoctorsRouter);
authenticatedRoute("/files", filesRouter);
authenticatedRoute("/hospitals", hospitalsRouter);
authenticatedRoute("/notes", notesRouter);
authenticatedRoute("/presentation-contacts", presentationContactsRouter);
authenticatedRoute("/presentation-invitations", presentationInvitationsRouter);
authenticatedRoute("/prospective-doctors", prospectiveDoctorsRouter);
authenticatedRoute("/scheduled-presentations", scheduledPresentationsRouter);
authenticatedRoute("/specialties", specialtiesRouter);
authenticatedRoute("/tasks", tasksRouter);
authenticatedRoute("/user-management", userManagmentRouter);
authenticatedRoute("/users", usersRouter);

app.get("/", (req, res) => res.type("html").send(html));

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.use(function (req, res, next) {
  res.status(404).json({
    message: "No such route exists",
  });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message" + err.message,
  });
});
