import React from "react";

const DisplayStudentInfo = (props) => {
  const courses = props.student.course;
  if (typeof courses !== "undefined") {
    const course = courses[0];
    const address = props.student.address[0];

    return (
      <div className="main_container">
        <div className="flex_container">
          <div className="info_card">
            <h3>{props.student.name}</h3>
            <p>
              <strong>PRN : </strong>
              {props.student.prn}
            </p>
            <p>
              <strong>D.O.B : </strong>
              {props.student.birthDate.substring(0, 10)}
            </p>
            <p>
              <strong>School : </strong>
              {course.school}
            </p>
          </div>
          <div className="info_table">
            <table>
              <tr>
                <th width="30%">Roll</th>
                <td width="2%">:</td>
                <td>125</td>
              </tr>
              <tr>
                <th width="30%">Course </th>
                <td width="2%">: </td>
                <td>{course.courseName}</td>
              </tr>
              <tr>
                <th width="30%">Year </th>
                <td width="2%">: </td>
                <td>{course.year}</td>
              </tr>

              <tr>
                <th width="30%">Gender</th>
                <td width="2%">:</td>
                <td>Male</td>
              </tr>
              <tr>
                <th width="30%">Address</th>
                <td width="2%">: </td>
                <td>
                  {address.street} {address.city}, {address.district},
                  <br />
                  {address.state}
                  <br />
                  Pincode : {address.pinCode}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className="flex_container">
          <div className="attendance_table"></div>
        </div>
      </div>
    );
  }
};
export default DisplayStudentInfo;
