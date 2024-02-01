const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const authRouter = require("./routes/auth.routes");
const cooperativeDoctorsRouter = require("./routes/cooperative-doctors.routes");
const prospectiveDoctorsRouter = require("./routes/prospective-doctors.routes");
const hospitalsRouter = require("./routes/hospitals.routes");
const notesRouter = require("./routes/notes.routes");
const presentationsRouter = require("./routes/presentations.routes");
const specialtiesRouter = require("./routes/specialties.routes");
const usersRouter = require("./routes/users.routes");
const userManagmentRouter = require("./routes/user-management.routes");

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
  "/presentations",
  passport.authenticate("jwt", { session: false }),
  presentationsRouter
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
