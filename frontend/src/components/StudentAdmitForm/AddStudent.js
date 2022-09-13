import React, { useState, useEffect } from "react";
import axios from "axios";
import StateAddress from "./Address/StateAddress";
import DistrictAddress from "./Address/DistrictAddress";
import PincodeAddress from "./Address/PincodeAddress";
import CityAddress from "./Address/CityAddress";
import Schools from "./Course/School";
import Courses from "./Course/Courses";
import Years from "./Course/Years";
import "./AddStudentFormStyle.css";

const AddStudent = (props) => {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    prn: "",
    birthDate: "",
  });
  const [course, setCourse] = useState({
    school: "",
    courseName: "",
    year: "",
  });
  const [address, setAddress] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    pinCode: "",
  });
  const [cityOptions, setCityOptions] = useState([]);

  const onChangePersonalDetails = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeCourse = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAddress = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authHeader = localStorage.getItem("AttendanceAppAuth");
      console.log("sp1");
      axios
        .post("http://localhost:5000/authentication/authenticate", {
          headers: {
            Authorization: `Bearer ${authHeader}`,
          },
        })
        .then((response) => {
          const authorizedUserTypes = ["faculty", "admin"];
          console.log(response, response.data.authentication);
          const userType = response.data.authentication;
          if (!authorizedUserTypes.includes(userType)) {
            console.log("sp1");
            document.location.href = "http://localhost:3000/login";
          }
        })
        .catch((error) => {
          console.log("server Error:  ", error);
        });
    };
    checkAuth();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const student = {
      name: personalDetails.name,
      prn: personalDetails.prn,
      birthDate: personalDetails.birthDate,
      course: course,
      address: address,
    };
    console.log("sup", student);

    axios
      .post("http://localhost:5000/student/admit", student)
      .then((res) => console.log(res.data))
      .catch((error) => {
        console.log(error);
        setError(error.response.data);
      });
    // window.location = "/";
  };

  const [error, setError] = useState(null);
  const errorDiv = error ? (
    <div className="error">
      <i className="material-icons error-icon">error_outline</i>
      {error}
    </div>
  ) : (
    ""
  );

  return (
    <div className="main_container">
      <div className="form-area">
        <h3>Enter Student Info</h3>
        {errorDiv}
        <form onSubmit={onSubmit}>
          <div className="flex_container">
            <div className="input-container">
              <label className="label filled" htmlFor="name">
                Student Name
              </label>
              <input
                type="text"
                className="text-input"
                autoComplete="off"
                placeholder=" Enter Student Name"
                required
                name="name"
                id="name"
                value={personalDetails.name}
                onChange={onChangePersonalDetails}
              />
            </div>
            <div className="input-container">
              <label className="label filled"> PRN </label>
              <input
                type="text"
                className="text-input"
                autoComplete="off"
                placeholder=" Enter PRN"
                required
                name="prn"
                value={personalDetails.prn}
                onChange={onChangePersonalDetails}
              />
            </div>
          </div>

          <div className="flex_container">
            <div className="input-container">
              <label className="label filled"> Blood Group </label>
              <input
                type="text"
                className="text-input"
                autoComplete="off"
                placeholder=" Enter Blood Group"
                required
                name="prn"
                value={personalDetails.prn}
                onChange={onChangePersonalDetails}
              />
            </div>
            <div className="input-container">
              <label className="label filled"> Birth Date </label>
              <input
                type="date"
                required
                className="text-input"
                autoComplete="off"
                name="birthDate"
                value={personalDetails.birthDate}
                onChange={onChangePersonalDetails}
              />
            </div>
          </div>

          <h5>Address</h5>
          <div className="flex_container input-container2">
            <label className="label filled"> Street </label>
            <input
              type="text"
              className="text-input"
              autoComplete="off"
              placeholder=" Street"
              required
              name="street"
              value={address.street}
              onChange={onChangeAddress}
            />
          </div>
          <div className="flex_container">
            <PincodeAddress
              address={address}
              onChangeAddress={onChangeAddress}
              setAddress={setAddress}
              cityOptions={cityOptions}
              setCityOptions={setCityOptions}
            />

            <CityAddress
              cityOptions={cityOptions}
              address={address}
              onChangeAddress={onChangeAddress}
            />
          </div>
          <div className="flex_container">
            <DistrictAddress
              address={address}
              onChangeAddress={onChangeAddress}
            />
            <StateAddress address={address} onChangeAddress={onChangeAddress} />
          </div>

          <h5>Course </h5>

          <div className="flex_container">
            <Schools course={course} onChangeCourse={onChangeCourse} />
            <Courses course={course} onChangeCourse={onChangeCourse} />
          </div>
          <div className="flex_container_2">
            <Years course={course} onChangeCourse={onChangeCourse} />
          </div>
          <div className="flex_container" style={{ marginTop: "20px" }}>
            <input
              type="submit"
              className="btn btn-dark btn-lg"
              value="Submit Student Details"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
