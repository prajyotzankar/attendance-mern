import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DisplayStudentInfo from "./DisplayStudentInfo";

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

class ListStudentByPrn extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    let { prn } = this.props.params;
    const authHeader = localStorage.getItem("AttendanceAppAuth");
    axios
      .get("http://localhost:5000/student/studentByPRN/" + prn, {
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      })
      .then((response) => {
        this.setState({ students: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleJson(json) {
    return JSON.stringify(this.state.students);
  }

  StudentList() {
    return (
      <DisplayStudentInfo
        student={this.state.students}
        key={this.state.students._id}
      />
    );
  }

  render() {
    return (
      <div>
        <h3>Student Detail</h3>
        {this.StudentList()}
      </div>
    );
  }
}

export default withParams(ListStudentByPrn);
