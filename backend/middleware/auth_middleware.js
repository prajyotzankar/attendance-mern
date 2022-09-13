const jwt = require("jsonwebtoken");
const User_auth = require("../models/user_auth");

checkAuth =  async (req) => {
  
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
    ) {
      try {
      let token;
        token = req.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(
          token,
          process.env.JWT_SECRET_KEY);
        
        const user = await User_auth.findById(decodedToken.id);
        if (user && user.userType === decodedToken.userType) {
          return {
            auth: "verified",
            userType: user.userType,
            documentID: decodedToken.id,
            userID: user.userID,
          };
        }
        console.log("auth_middleware: user NA or/and UserType mismatch");
        return {
          auth: "failed",
          userType: "undefined",
          documentID: "undefined",
          prn: "undefined",
        };

    } catch (error) {
      console.log("auth_middleware: token Error");
      return {
        auth: "failed",
        userType: "undefined",
        documentID: "undefined",
        prn: "undefined",
      };
    }
    
    // if (token) {
    //   const decodedToken = jwt.verify(
    //     token,
    //     process.env.JWT_SECRET_KEY,
    //     (error, decodedToken) => {
    //       if (error) {
    //         console.log(error);
    //         return error;
    //       }
    //       return decodedToken;
    //     }
    //   );
    //   if (decodedToken instanceof Error) {
    //     console.log("auth_middleware: instanceof Error");
    //     return { auth: "failed", userType: "undefined" };
    //   }

    //   return User_auth.findById(decodedToken.id)
    //     .then((user) => {
    //       if (user && user.userType === decodedToken.userType) {
    //         return {
    //           auth: "verified",
    //           userType: user.userType,
    //           documentID: decodedToken.id,
    //           userID: user.userID,
    //         };
    //       }
    //       console.log("auth_middleware: user NA or/and UserType mismatch");
    //       return {
    //         auth: "failed",
    //         userType: "undefined",
    //         documentID: "undefined",
    //         prn: "undefined",
    //       };
    //     })
    //     .catch(() => {
    //       return {
    //         auth: "failed",
    //         userType: "undefined",
    //         documentID: "undefined",
    //         prn: "undefined",
    //       };
    //     });
    // }
    // console.log("auth_middleware: token Error");
    // return {
    //   auth: "failed",
    //   userType: "undefined",
    //   documentID: "undefined",
    //   prn: "undefined",
    // };
  }
  console.log("auth_middleware: token Error");
  return {
    auth: "failed",
    userType: "undefined",
    documentID: "undefined",
    prn: "undefined",
  };
};

module.exports = checkAuth;
