const express = require("express");
const authentication = require("./controllers/authentication.js");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

const router = express();

router.get("/", requireAuth, (req, res) => {
  res.send("hello");
});

router.post("/signin", requireSignin, authentication.signin);

router.post("/signup", authentication.signup);

module.exports = router;
