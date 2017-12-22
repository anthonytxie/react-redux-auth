const passport = require("passport");
const User = require("../models/user.js");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local");

const localOptions = { usernameField: "email" };

const localLogin = new LocalStrategy(localOptions, async function(
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      done(null, false);
    } else {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }
  } catch (e) {
    done(e);
  }
});

// setup options for jwt strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: process.env.secret
};

// create jwt strategy

const jwtLogin = new JwtStrategy(jwtOptions, async function(payload, done) {
  try {
    const user = await User.findById(payload.sub);
    if (!user) {
      done(null, false);
    } else {
      done(null, user);
    }
  } catch (e) {
    done(e);
  }
});

// tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
