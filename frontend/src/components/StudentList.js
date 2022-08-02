import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Student = (props) => (
  <tr>
    <td>{props.student.prn}</td>
    <td>{props.student.name}</td>
    <td>{props.student.birthDate.substring(0, 10)}</td>
    <td>
      <Link to={"/student/" + props.student.prn}>View more Details</Link>
    </td>
  </tr>
);

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/student/")
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  StudentList() {
    return this.state.students.map((currentstudent) => {
      return <Student student={currentstudent} key={currentstudent._id} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Student List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>PRN</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.StudentList()}</tbody>
        </table>
      </div>
    );
  }
}

export default StudentList;
