import React, { useState } from "react";
import axios from "axios";
import "./RegistrationStyle.css";
import PasswordValidation from "./PasswordValidation";

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

  const onChangePRN = (e) => {
    if (e.target.value.length === 11) {
      var regex = /^[SAE][0-9]{10}?$/;
      if (!regex.test(e.target.value)) {
        setCollegeEmailID("");
        setPRN({
          [e.target.name]: e.target.value,
          validity: false,
        });
      } else {
        var collegeEmail =
          e.target.value.replace(/[^0-9]/g, "") + "@college.edu.in";
        console.log(e.target.value.replace(/[^0-9]/g, ""), collegeEmail);
        setCollegeEmailID(collegeEmail);
        setPRN({
          [e.target.name]: e.target.value,
          validity: true,
        });
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
    }
    else {
      setPersonalEmailID({
        [e.target.name]: e.target.value,
        validity: true,
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password.validity && password.passwordMatch && PRN.validity && personalEmailID.validity) {
      const userType =
        PRN.PRN.slice(0, 1) === "A"
          ? "admin"
          : PRN.PRN.slice(0, 1) === "S"
          ? "student"
            : "faculty";
      const userID = PRN.PRN.slice(1);
      axios
        .get("http://localhost:5000/student/studentByPRN/" + userID)
        .then((response) => {
          console.log(response.data);
          const user = {
            userID,
            userType,
            personalEmailID: personalEmailID.personalEmailID,
            collegeEmailID,
            password: password.password,
          };
          console.table(user);
          axios
            .post("http://localhost:5000/authentication/register", user)
            .then((res) => console.log(res.data))
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      console.log("error in validation");
      console.log(
        "sup",
        password.validity,
        password.passwordMatch,
        PRN.validity,
        personalEmailID.validity
      );
    }
}

  return (
    <div className="main_container_registration">
      <div className="form_area_registration">
        <h3>Registration</h3>
        <form onSubmit={onSubmit}>
          <div className="flex_container_registration">
            {JSON.stringify(PRN)}
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
            {JSON.stringify(personalEmailID)}
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
            {JSON.stringify(password)}
            <PasswordValidation password={password} setPassword={setPassword} />

            <input
              type="submit"
              className="btn btn-dark btn-lg"
              value="Register"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
