import React, { useState, useEffect } from "react";
import axios from "axios";

const School = (props) => {
  const [schoolOptions, setSchoolOptions] = useState({});

  useEffect(() => {
    const getSchoolOptions = async () => {
      await axios
        .get("http://localhost:5000/schoolsCourses/schools")
        .then((response) => {
          setSchoolOptions(response.data);
        })
        .catch((error) => console.log(error));
    };
    getSchoolOptions();
  }, []);

  return (
    <div className="input-container">
      <label className="label filled"> School </label>
      <select
        type="text"
        required
        placeholder=" School"
        className="text-input"
        name="school"
        value={props.course.school}
        onChange={props.onChangeCourse}
      >
        <option value="">--Select School--</option>
        {(() => {
          if (typeof schoolOptions !== "undefined") {
            return Object.keys(schoolOptions).map((key) => {
              return (
                <option key={key} value={schoolOptions[key]}>
                  {schoolOptions[key]}
                </option>
              );
            });
          }
        })()}
      </select>
    </div>
  );
};

export default School;
