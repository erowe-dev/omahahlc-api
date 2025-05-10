const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.model");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
require("dotenv").config();

passport.use(
  new JWTstrategy(
    {
      secretOrKey: process.env.API_SECRET,
      jwtFromRequest: (req) => {
        // Check for token in Authorization header
        const authHeaderToken = ExtractJWT.fromAuthHeaderAsBearerToken()(req);
        if (authHeaderToken) {
          return authHeaderToken;
        }

        // Check for token in URL query parameter

        if (req && req.query && req.query.token) {
          return req.query.token;
        }

        return null;
      },
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        email = email.toLowerCase();
        const user = await UserModel.create({ email, password });

        return done(null, user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        email = email.toLowerCase();
        const user = await UserModel.findOne({
          email: { $regex: new RegExp(email, "i") },
        }).select("+password");

        if (!user) {
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.isValidPassword(password);

        if (!validate) {
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
