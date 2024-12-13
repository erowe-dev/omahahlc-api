const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const authRouter = require("./routes/auth.routes");
const completedPresentationsRouter = require("./routes/completed-presentations.routes");
const cooperativeDoctorsRouter = require("./routes/cooperative-doctors.routes");
const hospitalsRouter = require("./routes/hospitals.routes");
const notesRouter = require("./routes/notes.routes");
const presentationContactsRouter = require("./routes/presentation-contacts.routes");
const presentationInvitationsRouter = require("./routes/presentation-invitations.routes");
const prospectiveDoctorsRouter = require("./routes/prospective-doctors.routes");
const scheduledPresentationsRouter = require("./routes/scheduled-presentations.routes");
const specialtiesRouter = require("./routes/specialties.routes");
const userManagmentRouter = require("./routes/user-management.routes");
const usersRouter = require("./routes/users.routes");

const port = process.env.PORT || 3001;
const dbConnectionString = process.env.MongoURI;

mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

mongoose.Promise = global.Promise;

require("./auth/auth");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);
app.use("/auth", authRouter);

app.use(
  "/scheduled-presentations",
  passport.authenticate("jwt", { session: false }),
  scheduledPresentationsRouter
);
app.use(
  "/completed-presentations",
  passport.authenticate("jwt", { session: false }),
  completedPresentationsRouter
);
app.use(
  "/cooperative-doctors",
  passport.authenticate("jwt", { session: false }),
  cooperativeDoctorsRouter
);
app.use(
  "/prospective-doctors",
  passport.authenticate("jwt", { session: false }),
  prospectiveDoctorsRouter
);
app.use(
  "/hospitals",
  passport.authenticate("jwt", { session: false }),
  hospitalsRouter
);
app.use(
  "/notes",
  passport.authenticate("jwt", { session: false }),
  notesRouter
);
app.use(
  "/presentation-contacts",
  passport.authenticate("jwt", { session: false }),
  presentationContactsRouter
);
app.use(
  "/presentation-invitations",
  passport.authenticate("jwt", { session: false }),
  presentationInvitationsRouter
);
app.use(
  "/specialties",
  passport.authenticate("jwt", { session: false }),
  specialtiesRouter
);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);
app.use(
  "/user-management",
  passport.authenticate("jwt", { session: false }),
  userManagmentRouter
);

app.get("/", (req, res) => res.type("html").send(html));

app.listen(port, () => console.log(`App listening on port ${port}!`));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message: "No such route exists",
  });
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message",
  });
});
