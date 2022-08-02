import React from "react";

const DisplayStudentInfo = (props) => {
  const courses = props.student.course;
  if (typeof courses !== "undefined") {
    const course = courses[0];
    const address = props.student.address[0];
  
    return (
      <div class="student-profile py-4">
        <div class="container">
          <div class="row">
            <div class="col-lg-4">
              <div class="card shadow-sm">
                <div class="card-header bg-transparent text-center">
                  <h3>{props.student.name}</h3>
                </div>
                <div class="card-body">
                  <p class="mb-0">
                    <strong class="pr-1">PRN : </strong>
                    {props.student.prn}
                  </p>
                  <p class="mb-0">
                    <strong class="pr-1">D.O.B : </strong>
                    {props.student.birthDate.substring(0, 10)}
                  </p>
                  <p class="mb-0">
                    <strong class="pr-1">School : </strong>
                    {course.school}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card shadow-sm">
                <div class="card-header bg-transparent border-0">
                  <h3 class="mb-0">
                    <i class="far fa-clone pr-1"></i>General Information
                  </h3>
                </div>
                <div class="card-body pt-0">
                  <table class="table table-bordered">
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
