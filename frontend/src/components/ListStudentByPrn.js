import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DisplayStudentInfo from './DisplayStudentInfo';

function withParams(Component) {
  console.log("withParams");
  return (props) => <Component {...props} params={useParams()} />;
}

class ListStudentByPrn extends Component {
  constructor(props) {
    super(props);
    this.state = { students: [] };
  }

  componentDidMount() {
    console.log("componentDidMount");
    let { prn } = this.props.params;
    axios
      .get("http://localhost:5000/student/" + prn)
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
    console.log("StudentList");
    return <DisplayStudentInfo student={this.state.students} key={this.state.students._id} />;
  }

  render() {
    return (
      <div>
        <h3>Student Detail</h3>
        {console.log('this.StudentList')}
        {this.StudentList()}
      </div>
    );
  }
}

export default withParams(ListStudentByPrn);
