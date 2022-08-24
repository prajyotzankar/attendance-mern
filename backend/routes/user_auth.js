const router = require("express").Router();
const User_auth = require("../models/user_auth");
const sendEmail = require("../middleware/sendEmail");
const crypto = require("crypto")

router.route("/register").post((req, res) => {
  const newUser = new User_auth({
    userType: req.body.userType,
    userID: req.body.userID,
    collegeEmailID: req.body.collegeEmailID,
    personalEmailID: req.body.personalEmailID,
    password: req.body.password,
  });

  newUser
    .save()
    .then(SendToken(newUser, res))
    .catch((error) => res.status(400).json("Error: " + error));
});

router.route("/login").post((req, res) => {
  const { userType, userID, password } = req.body;

  if (!userType || !userID || !password) {
    if (!userType) {
      return res
        .status(400)
        .json("Please enter the leading letter in UserID !!!");
    }
    return res.status(400).json("Please enter both UserID and Password");
  }

  User_auth.findOne(
    { userID: userID, userType: userType },
    { userType: 1, userID: 1, password: 1 }
  )
    .then(async (user) => {
      if (user) {
        const isMatch = await user.matchPassword(password);
        if (isMatch) {
          return SendToken(user, res);
        }
        return res.status(400).json("Invalid Credentials");
      }
      return res.status(400).json("Invalid Credentials");
    })
    .catch((error) => res.status(400).json("Error " + error));
});

router.route("/forgotPassword").post((req, res) => {
  const { userID, userType, personalEmailID } = req.body;

  if (!userType || !userID || !personalEmailID) {
    if (!userType) {
      return res
        .status(400)
        .json("Please enter the leading letter in UserID !!!");
    }
    return res.status(400).json("Please enter both UserID and Personal Email");
  }

    User_auth.findOne({
      userID: userID,
      userType: userType,
      personalEmailID: personalEmailID,
    })
      .then(async (user) => {
        console.log(user);
        if (user) {
          const resetToken = user.getPasswordResetToken();
          await user.save();
          const resetURL = `${process.env.FRONTEND_AUTH_URL}/resetpassword/${resetToken}`;

          const message = `
      <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
               
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${resetURL} clicktracking=off
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    <tr>
                        <td style="height:20px;">&nbsp;</td>
                    </tr>
             
                    <tr>
                        <td style="height:80px;">&nbsp;</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
      `;

          try {
            await sendEmail({
              to: user.personalEmailID,
              subject: "Password Reset Request",
              text: message,
            });

            return res.status(200).json("Email is sent check your account");
          } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();
            return res.status(500).json("Email could not be sent: " + error);
          }
        }
        return res.status(400).json("Invalid Credentials");
      })
      .catch((error) => res.status(400).json("Error " + error));


});

router.route("/resetPassword/:resetToken").put((req, res) => {
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex");

  User_auth.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
    .then( async (user) => {
      if (user) {
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
        return res.status(201).json("Password reset Successful");
      }
      return res.status(400).json("Invalid Credentials");
    })
    .catch((error) => res.status(400).json("Error " + error));
})

router.route("/changepassword").post(async (req, res) => {

  const { auth, documentID } = await checkAuth(req);
  if (auth === "verified") { 
    const { currentPassword, newPassword } = req.body;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json("Credentials missing")
    }

    return User_auth.findById(documentID, { userType: 1, password: 1 }).then(async (user) => {
      if (user) {
        const isMatch = await user.matchPassword(currentPassword);
        if (isMatch) {
          user.password = newPassword;
          await user.save();
          return res.status(201).json("Password Changed Successfully");
        }
        return res.status(400).json("Invalid Credentials");
      }
      return res.status(400).json("Invalid Credentials");
    }).catch((error) => { return res.status(400).json("Error: " + error) }); 
      
  }
  return res.status(404).json("Access Denied");
  
})

const SendToken = (user, res) => {
  const token = user.getSignedToken();
  return res.json({token});
}

module.exports = router;
