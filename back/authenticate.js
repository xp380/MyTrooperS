const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
  maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
  sameSite: "none",
};

exports.getToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: eval(process.env.SESSION_EXPIRY),
  });
};
// Pour créér le token
exports.getRefreshToken = (user) => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
  });
  return refreshToken;
};
// Pour créé le token rafraichi
exports.verifyUser = passport.authenticate("jwt", { session: false });
// middleware qui sera appelé pour chaque requête authentifié
