const jwt = require("jwt-simple");
const authentication = {};
const User = require("../models/user.js");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.secret);
}

authentication.signin = async (req, res) => {
  res.send({ token: tokenForUser(req.user) });
};

authentication.signup = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send("You must submit an email or password");
  }
  const { email, password } = req.body;

  const user = await User.findOrCreateUser(email, password);

  res.send({ token: tokenForUser(user) });
};

module.exports = authentication;
