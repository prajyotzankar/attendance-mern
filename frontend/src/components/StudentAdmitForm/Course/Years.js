import React, { useState, useEffect } from "react";
import axios from "axios";

const Years = (props) => {
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const getDuration = async () => {
      if (typeof props.course.courseName !== "undefined") {
        if (props.course.courseName.length > 0) {
          const authHeader = localStorage.getItem("AttendanceAppAuth");

          await axios
            .get(
              `http://localhost:5000/schoolsCourses/duration/${props.course.school}/${props.course.courseName}`,
              {
                headers: {
                  Authorization: `Bearer ${authHeader}`,
                },
              }
            )
            .then((response) => {
              setDuration(response.data[0]["Duration"]);
            })
            .catch((error) => console.log(error));
        }
      }
    };
    getDuration();
  }, [props.course.courseName]);

  return (
    <div className="input-container">
      <label className="label filled "> Year </label>
      <select
        type="text"
        required
        name="year"
        className="text-input"
        value={props.course.year}
        onChange={props.onChangeCourse}
      >
        <option value="">--Select Year--</option>
        {(() => {
          var years = ["First Year", "Second Year", "Third Year", "Forth Year"];
          var counter = 0;
          return years.map((year) => {
            if (counter < duration) {
              counter++;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            }
            return years;
          });
        })()}
      </select>
    </div>
  );
};

export default Years;
