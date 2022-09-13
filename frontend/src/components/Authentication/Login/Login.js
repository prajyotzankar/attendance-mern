import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LoginStyle.css";

const Login = (props) => {
  const [PRN, setPRN] = useState({
    PRN: "",
    validity: false,
  });
  const [password, setPassword] = useState({
    password: "",
    validity: false,
  });

  const onChangePRN = async (e) => {
    if (e.target.value.length === 11) {
      var regex = /^[SAE][0-9]{10}?$/;
      if (!regex.test(e.target.value)) {
        setPRN({
          [e.target.name]: e.target.value,
          validity: false,
        });
      } else {
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
    }
  };

  const onChangePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value.replace(
        /[^0-9A-za-z!@#$%^&*()_+<>?]/g,
        ""
      ),
    });
  };

  useEffect(() => {
    const regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[!@#$%^&*()_+<>?]).{10,20})\S$/;
    if (!regex.test(password.password)) {
      setPassword({
        ...password,
        validity: false,
      });
    } else {
      setPassword({
        ...password,
        validity: true,
      });
    }
  }, [password.password]);

  const onSubmitLogin = async (e) => {
    e.preventDefault();

    if (password.validity && PRN.validity) {
      try {
        const userType =
          PRN.PRN.slice(0, 1) === "A"
            ? "admin"
            : PRN.PRN.slice(0, 1) === "S"
            ? "student"
            : "faculty";
        const userID = PRN.PRN.slice(1);

        const user = {
          userID,
          userType,
          password: password.password,
        }
        const loginUser = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}authentication/login`,
          user
        );
        console.log("loginUser", loginUser);
        localStorage.setItem("AttendanceAppAuth", loginUser.data.token);
        if (["admin", "faculty"].includes(userType)) {
            document.location.href = "http://localhost:3000/student/add";
        }
        if (userType === "student") {
          document.location.href = `http://localhost:3000/student/${userID}`;
        }
      } catch (error) {
        console.log(error.response.data);
        if (error.response.data === "Invalid Credentials") {
          setError(error.response.data);
        }
        
      }
    } else {
      console.log("error in validation");
    }
  };

  const [error, setError] = useState(null);
  const errorDiv = error ? (
    <div className="error">
      <i className="material-icons error-icon">{error}</i>
    </div>
  ) : (
    ""
  );

  return (
    <div className="main_container_login">
      <div className="form_area_login">
        <h3>Login</h3>
        {errorDiv}
        <form onSubmit={onSubmitLogin}>
          <div className="flex_container_login">
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
                required
                value={PRN.PRN}
                onChange={onChangePRN}
              />
              <div className="validationBox">
                <b>
                  {PRN.validity
                    ? " \u2713"
                    : " \u274C Enter PRN with leading letter."}
                </b>
              </div>
            </div>
            <div className="input_container">
              <label className="label filled" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                autoComplete="current-password"
                className="text_input"
                placeholder=" Enter Password"
                name="password"
                id="password"
                required
                value={password.password}
                onChange={onChangePassword}
              />
              <div className="validationBox">
                <b>
                  {password.validity
                    ? " \u2713"
                    : " \u274C Enter Proper Password."}
                </b>
              </div>
            </div>

            <input
              type="submit"
              className="btn btn-dark btn-lg"
              value="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
