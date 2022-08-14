import React, { useState, useEffect } from "react";
import axios from "axios";

const Courses = (props) => {
  const [courseOptions, setCourseOptions] = useState({});

  useEffect(() => {
      const getCourseOptions = async () => {
          if (typeof props.course.school !== "undefined") { 
              if (props.course.school.length > 0) { 
                  await axios
                    .get(
                      "http://localhost:5000/schoolsCourses/courses/" +
                        props.course.school
                    )
                    .then((response) => {
                      setCourseOptions(response.data);
                    })
                    .catch((error) => console.log(error));
              }
          }
    };
    getCourseOptions();
  }, [props.course.school]);

  return (
    <div className="input-container">
      <label className="label filled"> Course </label>
      <select
        type="text"
        required
        name="courseName"
        className="text-input"
        value={props.course.courseName}
        onChange={props.onChangeCourse}
      >
        <option value="">--Select Course Name--</option>
        {(() => {
          if (typeof courseOptions !== "undefined") {
            return Object.keys(courseOptions).map((key) => {
              return (
                <option key={key} value={courseOptions[key]}>
                  {courseOptions[key]}
                </option>
              );
            });
          }
        })()}
      </select>
    </div>
  );
};

export default Courses;
