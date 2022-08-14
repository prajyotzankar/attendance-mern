import React from "react";

const DisplayStudentInfo = (props) => {
  const courses = props.student.course;
  if (typeof courses !== "undefined") {
    const course = courses[0];
    const address = props.student.address[0];
  
    return (
      <div className="student-profile py-4">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-header bg-dark text-center">
                  <h3>{props.student.name}</h3>
                </div>
                <div className="card-body bg-dark">
                  <p className="mb-0">
                    <strong className="pr-1">PRN : </strong>
                    {props.student.prn}
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">D.O.B : </strong>
                    {props.student.birthDate.substring(0, 10)}
                  </p>
                  <p className="mb-0">
                    <strong className="pr-1">School : </strong>
                    {course.school}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header bg-dark border-0">
                  <h3 className="mb-0">
                    <i className="far fa-clone pr-1"></i>General Information
                  </h3>
                </div>
                <div className="card-body pt-0 bg-dark">
                  <table className="table table-bordered">
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
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayStudentInfo;
