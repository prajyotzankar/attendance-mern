import React from "react";
import { Link } from "react-router-dom";
import "./StudentListStyle.css";


const ListStudentInfoTable = (props) => {
  return (
    <div>
      <div className="main_container">
        <h3>Student List</h3>
      </div>
      <div className="flex_container">
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>PRN</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(() => {
              return Object.keys(props.students).map((key) => {
                return (
                  <tr>
                    <td>{props.students[key].prn}</td>
                    <td>{props.students[key].name}</td>
                    <td>{props.students[key].birthDate.substring(0, 10)}</td>
                    <td>
                      <Link to={"/student/" + props.students[key].prn}>
                        View more Details
                      </Link>
                    </td>
                  </tr>
                );
              });
            })()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudentInfoTable;
