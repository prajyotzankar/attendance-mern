import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import Schools from "../StudentAdmitForm/Course/School";
import Courses from "../StudentAdmitForm/Course/Courses";
import Years from "../StudentAdmitForm/Course/Years";
import "./StudentListStyle.css";
import StudentTable from "./ListStudentInfoTable";

const ListStudentInfo = (props) => {
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState({
    school: "",
    courseName: "",
    year: "",
  });

  const onChangeCourse = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const getStudents = async () => {
      if (typeof course.year !== "undefined") {
        if (course.year.length > 0) {
          await axios
            .get(
              "http://localhost:5000/student/filterByCourse/" +
                course.school +
                "/" +
                course.courseName +
                "/" +
                course.year
            )
            .then((response) => {
              setStudents(response.data);
            })
            .catch((error) => console.log(error));
        }
      }
    };
    getStudents();
  }, [course.year]);

  return (
    <div className="main_container">
      <div className="form-area">
        <h3>Enter Student Info</h3>
        <div className="flex_container">
          <Schools course={course} onChangeCourse={onChangeCourse} />
          <Courses course={course} onChangeCourse={onChangeCourse} />
          <Years course={course} onChangeCourse={onChangeCourse} />
        </div>
      </div>
      <div className="table-area">

      {(() => {
        if (typeof students[0] !== "undefined") {
          if (students[0].prn.length > 0) {
            return <StudentTable students={students} />;
          }
        } else {
          if (course.year.length > 0)
          return <h3>No Student Under this Selections</h3>;
        }
      })()}
      </div>
    </div>
  );
};

export default ListStudentInfo;
