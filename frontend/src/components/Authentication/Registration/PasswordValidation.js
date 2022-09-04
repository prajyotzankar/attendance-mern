import React, { useState, useEffect } from "react";
import "./RegistrationStyle.css";
import "./PasswordValidationStyle.css";
import RandomPasswordGenerator from "./RandomPasswordGenerator";

const PasswordValidation = (props) => {
  const [checkCase, setCheckCase] = useState(false);
  const [checkSpecialChar, setCheckSpecialChar] = useState(false);
  const [checkNumber, setCheckNumber] = useState(false);
  const [checkLength, setCheckLength] = useState(false);
  const [passwordStrengthLabel, setPasswordStrengthLabel] = useState(false);
  const [passwordEntropy, setPasswordEntropy] = useState(0);

  const funcCheckLength = (password) => {
    setCheckLength(password.length >= 10);
  };

  const funcCheckNumber = (password) => {
    const pattern = /[0-9]/;
    setCheckNumber(pattern.test(password));
  };

  const funcCheckCase = (password) => {
    const pattern = /((?=\S*?[A-Z])(?=\S*?[a-z]))/;
    setCheckCase(pattern.test(password));
  };

  const funcCheckSpecialChar = (password) => {
    const pattern = /[!@#$%^&*()_+<>?]+/;
    setCheckSpecialChar(pattern.test(password));
  };

  const calcEntropy = (passwordLength) => {
    const charsetLength = 77;
    var entropy = Math.round(
      (passwordLength * Math.log(charsetLength)) / Math.LN2
    );
    setPasswordEntropy(entropy);
  };

  const passwordStrength = () => {
    const strength = checkCase + checkSpecialChar + checkNumber + checkLength;
    if (strength === 1) setPasswordStrengthLabel("Very Weak");
    else if (strength === 2) setPasswordStrengthLabel("Weak");
    else if (strength === 3) setPasswordStrengthLabel("Good");
    else if (strength === 4) setPasswordStrengthLabel("Strong");
    else setPasswordStrengthLabel("Use a Strong Password");
  };

  const changeValidity = () => {
    const strength = checkCase + checkSpecialChar + checkNumber + checkLength;
    if (strength === 4) {
      props.setPassword({
        ...props.password,
        validity: true,
      });
    } else {
      props.setPassword({
        ...props.password,
        validity: false,
      });
    }
  };

  const onChangePassword = async (e) => {
    await props.setPassword({
      ...props.password,
      [e.target.name]: e.target.value.replace(/[^0-9A-za-z!@#$%^&*()_+<>?]/g, ""),
    });
  };

  const onChangeConfirmPassword = async (e) => {
    await props.setPassword({
      ...props.password,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    passwordStrength();
    changeValidity();
  }, [checkCase, checkSpecialChar, checkNumber, checkLength]);

  useEffect(() => {
    funcCheckNumber(props.password.password);
    funcCheckLength(props.password.password);
    funcCheckCase(props.password.password);
    funcCheckSpecialChar(props.password.password);
    calcEntropy(props.password.password.length);
  }, [props.password.password]);

  useEffect(() => {
    const checkConfirmPassword = () => {
      if (props.password.password !== props.password.confirmPassword) {
        props.setPassword({
          ...props.password,
          passwordMatch: false,
        });
      }
      if (props.password.password === props.password.confirmPassword) {
        props.setPassword({
          ...props.password,
          passwordMatch: true,
        });
      }
    };
    if (props.password.confirmPassword.length > 0) {
      checkConfirmPassword();
    }
  }, [props.password.confirmPassword]);

  const generatePassword = async (e) => {
    const generatedPassword = RandomPasswordGenerator();
    await props.setPassword({
      ...props.password,
      confirmPassword: generatedPassword,
      password: generatedPassword,
    });

    navigator.clipboard.writeText(generatedPassword);

    document.getElementById("custom-tooltip").style.display = "inline";
    setTimeout(function() {
      document.getElementById("custom-tooltip").style.display = "none";
    }, 5000);
  };

  return (
    <>
      <div className="input_container">
        <label className="label filled" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="text_input password"
          placeholder=" Enter Password"
          autoComplete="off"
          name="password"
          id="password"
          maxLength="20"
          required
          value={props.password.password}
          onChange={onChangePassword}
        />

        <div className="validationBox">
          <h5>Password Generator</h5>
          <h6>Strength : {passwordStrengthLabel}</h6>
          <h6>Entropy : {passwordEntropy + " bits"}</h6>

          <ul>
            <li id="letterCase" className={checkCase ? "valid" : "invalid"}>
              1 lowercase & 1 uppercase letter
            </li>
            <li id="number" className={checkNumber ? "valid" : "invalid"}>
              1 number(0 - 9)
            </li>
            <li
              id="specialChar"
              className={checkSpecialChar ? "valid" : "invalid"}
            >
              1 Special Character (!@#$%^&*)
            </li>
            <li id="length" className={checkLength ? "valid" : "invalid"}>
              Atleast 10 Characters (max 20)
            </li>
          </ul>
          <input
            type="button"
            id="custom-tooltip"
            className="btn btn-dark btn-lg"
            value="Copied! To Clipboard"
            disabled
          />
          <br />
          <input
            type="button"
            className="btn btn-dark btn-lg"
            value="Generate"
            onClick={(e) => generatePassword(e)}
          />
        </div>
      </div>
      <div className="input_container">
        <label className="label filled" htmlFor="confirmPassword">
          Confirm Password
        </label>
        <input
          type="password"
          className="text_input confirmPassword"
          placeholder=" Confirm Password"
          autoComplete="off"
          name="confirmPassword"
          id="confirmPassword"
          required
          value={props.password.confirmPassword}
          onChange={onChangeConfirmPassword}
        />
        <div className="validationBox">
          <b>
            {props.password.passwordMatch
              ? " \u2713 Password Match!!"
              : " \u274C Password don't Match"}
          </b>
        </div>
      </div>
    </>
  );
};

export default PasswordValidation;
