const jwt = require("jsonwebtoken");
const User_auth = require("../models/user_auth");

checkAuth =  (req) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY,
        (error, decodedToken) => {
          if (error) {
            return error;
          }
          return decodedToken;
        }
      );
      if (decodedToken instanceof Error) {
        return { auth: "failed", userType: "undefined" };
      }

      return User_auth.findById(decodedToken.id)
        .then((user) => {
          if (user && user.userType === decodedToken.userType) {
            return {
              auth: "verified",
              userType: user.userType,
              documentID: decodedToken.id
            };
          }
          return {
            auth: "failed",
            userType: "undefined",
            documentID: "undefined",
          };
        })
        .catch(() => {
          return {
            auth: "failed",
            userType: "undefined",
            documentID: "undefined",
          };
        });
    }
    return {
      auth: "failed",
      userType: "undefined",
      documentID: "undefined",
    };
  }
  return { auth: "failed", userType: "undefined", documentID: "undefined" };
};

module.exports = checkAuth;
