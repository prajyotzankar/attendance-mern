import React, {  useState } from "react";
import axios from "axios";
import StateAddress from "./Address";

const AddStudent = (props) => {
  
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    prn: "",
    birthDate: "",
  });
  const [course, setCourse] = useState({
    school: "",
    courseName: "",
    year : ""
  });
  const [address, setAddress] = useState({
    street: '',
    city: '',
    district: '',
    state: '',
    pinCode: ''
  });

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
      .catch((error) => console.log(error));
    // window.location = "/";
  }

  
  
  return (
    <div>
      <h3>Enter Student Info</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name :</label>
          <input
            type="text"
            style={{ width: "100%" }}
            required
            name="name"
            id="name"
            value={personalDetails.name}
            onChange={onChangePersonalDetails}
          />
        </div>
        <div>
          <label>PRN : </label>
          <input
            type="text"
            style={{ width: "40%" }}
            required
            name="prn"
            value={personalDetails.prn}
            onChange={onChangePersonalDetails}
          />

          <label>Date : </label>
          <input
            style={{ width: "40%" }}
            type="date"
            required
            name="birthDate"
            value={personalDetails.birthDate}
            onChange={onChangePersonalDetails}
          />
        </div>
        <br />
        <h5>Address : {JSON.stringify(address)}</h5>
        <div>
          <input
            style={{ width: "100%" }}
            type="text"
            required
            placeholder="Street"
            name="street"
            value={address.street}
            onChange={onChangeAddress}
          />

          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="City"
            name="city"
            value={address.city}
            onChange={onChangeAddress}
          />

          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="District"
            name="district"
            value={address.district}
            onChange={onChangeAddress}
          />

          {/* <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="State"
            name="state"
            value={address.state}
            onChange={onChangeAddress}
          /> */}
          <StateAddress address={address} setAddress={setAddress} />

          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="Pin Code"
            name="pinCode"
            value={address.pinCode}
            onChange={onChangeAddress}
          />
        </div>
        <br />
        <h5>Course : {JSON.stringify(course)}</h5>
        <div>
          <input
            style={{ width: "100%" }}
            type="text"
            required
            placeholder="Course Name"
            name="courseName"
            value={course.courseName}
            onChange={onChangeCourse}
          />
          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="School"
            name="school"
            value={course.school}
            onChange={onChangeCourse}
          />
          <input
            style={{ width: "50%" }}
            type="text"
            required
            placeholder="Year"
            name="year"
            value={course.year}
            onChange={onChangeCourse}
          />
        </div>
        <div>
          <input type="submit" value="Submit Student Details" />
        </div>
      </form>
    </div>
  );
}


export default AddStudent;