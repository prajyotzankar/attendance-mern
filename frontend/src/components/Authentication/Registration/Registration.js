import React, { useState } from "react";
import axios from "axios";
import "./RegistrationStyle.css";
import PasswordValidation from "./PasswordValidation";
import Modal from "./modal";

const Registration = (props) => {
  const [PRN, setPRN] = useState({
    PRN: "",
    validity: false,
  });
  const [collegeEmailID, setCollegeEmailID] = useState("");
  const [personalEmailID, setPersonalEmailID] = useState({
    personalEmailID: "",
    validity: false,
  });
  const [password, setPassword] = useState({
    password: "",
    validity: false,
    confirmPassword: "",
    passwordMatch: false,
  });
  const [userReg, setUserReg] = useState(false);

  const onChangePRN = async (e) => {
    if (e.target.value.length === 11) {
      var regex = /^[SAE][0-9]{10}?$/;
      if (!regex.test(e.target.value)) {
        setCollegeEmailID("");
        setPRN({
          [e.target.name]: e.target.value,
          validity: false,
        });
        e.target.setCustomValidity(
          "PRN is 10 digit number with leading letter"
        );
        e.target.reportValidity();
      } else {
        var collegeEmail =
          e.target.value.replace(/[^0-9]/g, "") + "@college.edu.in";
        console.log(e.target.value.replace(/[^0-9]/g, ""), collegeEmail);
        setCollegeEmailID(collegeEmail);
        setPRN({
          [e.target.name]: e.target.value,
          validity: true,
        });
        e.target.setCustomValidity("");
      }
    } else {
      setPRN({
        [e.target.name]: e.target.value,
        validity: false,
      });
      setCollegeEmailID("");
    }
  };

  const onChangePersonalEmailID = (e) => {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    if (!regex.test(e.target.value)) {
      setPersonalEmailID({
        [e.target.name]: e.target.value,
        validity: false,
      });
      e.target.setCustomValidity("Input proper Email ID");
      e.target.reportValidity();
    } else {
      setPersonalEmailID({
        [e.target.name]: e.target.value,
        validity: true,
      });
      e.target.setCustomValidity("");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      password.validity &&
      password.passwordMatch &&
      PRN.validity &&
      personalEmailID.validity
    ) {
      try {
        const userType =
          PRN.PRN.slice(0, 1) === "A"
            ? "admin"
            : PRN.PRN.slice(0, 1) === "S"
            ? "student"
            : "faculty";
        const userID = PRN.PRN.slice(1);
        const checkAdmit = await axios.get(
          `${process.env.REACT_APP_BACKEND_BASE_URL}student/checkStudentByPRN/${userID}`
        );
        if (!checkAdmit) {
          console.log("First admit the user then Register");
          return;
        }

        const user = {
          userID,
          userType,
          personalEmailID: personalEmailID.personalEmailID,
          collegeEmailID,
          password: password.password,
        };
        const registerUser = await axios.post(
          `http://localhost:5000/authentication/register`,
          user
        );
        console.log("registerUser", registerUser);
        if (registerUser) setUserReg(true);
      } catch (error) {
        console.log(error.response.data);
        setError(error.response.data);
        document.getElementById("Register").disabled = true;
      }
    } else {
      console.log("error in validation");
      console.log(
        "sup",
        password.validity,
        password.passwordMatch,
        PRN.validity,
        personalEmailID.validity
      );
      var message = "Warning: Please input Proper Values";
      if (!PRN.validity)
        message = "Warning: PRN is 10 digit number with leading letter";
      else if (!personalEmailID.validity)
        message = "Error: Input proper Email ID";
      else if (!password.validity) message = "Error: Password Invalid";
      else if (!password.passwordMatch)
        message = "Error: Password do not Match";

      setValidityError(message);
    }
  };

  const [error, setError] = useState(null);
  const [validityError, setValidityError] = useState(null);
  const ShowValidityError = validityError && (
    <div className="error">
      <i className="material-icons error-icon">{validityError}</i>
    </div>
  );

  return (
    <div className="main_container_registration">
      <div className="form_area_registration">
        <h3>Registration</h3>
        {/* <ControlledPopup error={error} setError={setError} /> */}
        {ShowValidityError}
        {userReg ? (
          <Modal error={"Success"} />
        ) : error ? (
          <Modal error={error} />
        ) : (
          ""
        )}
        <form onSubmit={onSubmit}>
          <div className="flex_container_registration">
            <div className="input_container">
              <label className="label filled" htmlFor="PRN">
                PRN
              </label>
              <input
                type="text"
                className="text_input"
                placeholder=" Enter PRN"
                autoComplete="off"
                name="PRN"
                id="PRN"
                minLength="11"
                maxLength="11"
                required
                value={PRN.PRN}
                onChange={onChangePRN}
              />
            </div>

            <div className="input_container">
              <label className="label filled" htmlFor="collegeEmailID">
                College Email ID
              </label>
              <input
                type="email"
                className="text_input"
                autoComplete="off"
                name="collegeEmailID"
                id="collegeEmailID"
                required
                disabled
                value={collegeEmailID}
                //   onChange={}
              />
            </div>
            <div className="input_container">
              <label className="label filled" htmlFor="personalEmailID">
                Personal Email ID
              </label>
              <input
                type="email"
                className="text_input"
                placeholder=" Enter Personal Email"
                autoComplete="off"
                name="personalEmailID"
                id="personalEmailID"
                required
                value={personalEmailID.personalEmailID}
                onChange={onChangePersonalEmailID}
              />
            </div>
            <PasswordValidation password={password} setPassword={setPassword} />

            <input
              id="Register"
              type="submit"
              className="btn btn-dark btn-lg"
              value={error ? "Refresh and Try again" : "Register"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
