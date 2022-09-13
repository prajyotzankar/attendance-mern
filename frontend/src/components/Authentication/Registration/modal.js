import React from "react";
import ReactDom from "react-dom";
import "./ModalStyle.css";

export default function Modal(props) {
  var seconds = 400; // seconds for HTML
  var foo; // variable for clearInterval() function

  function redirectToLogin() {
    document.location.href = "http://localhost:3000/Login";
  }
  function redirectToAdmit() {
    document.location.href = "http://localhost:3000/student/add";
  }
  function refresh() {
    document.location.href = "http://localhost:3000/Registration";
  }

  function updateSecs() {
    document.getElementById("seconds").innerHTML = seconds;
    console.log(seconds);
    seconds--;
    if (seconds === -1) {
      clearInterval(foo);
      if (props.error === "Error: No Student found") {
        redirectToAdmit();
      } else {
        redirectToLogin();
      }
    }
  }

  function countdownTimer() {
    foo = setInterval(function() {
      updateSecs();
    }, 1000);
  }

  var heading = "Error";
  var subText = "Redirecting";

  const SetContent = () => {
    if (props.error === "Error: No Student found") {
      heading = "First admit the user then Register";
      subText = "You will be automatically redirected to Admit Section in";
    } else if (props.error === "Error: Duplicate Entry Error") {
      heading = "User is already Registered";
      subText = "You will be automatically redirected to Login in";
    } else if (props.error === "Success") {
      heading = "User Registration Successful";
      subText = "You will be automatically redirected to Login in";
    }
  };
  SetContent();

  countdownTimer();
  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="popup">
        {/* <button onClick={refresh}>Cancel Re-direction</button> */}
        <h4>{heading}</h4>
        <h4>{subText}</h4>
        <h3>
          <span id="seconds">10</span> seconds
        </h3>
        <input
          id="refresh"
          type="button"
          onClick={refresh}
          className="btn btn-dark btn-lg popupButton"
          value=" Cancel Re-direction "
        />
      </div>
    </>,
    document.getElementById("portal")
  );
}
