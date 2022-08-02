import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/Navbar";
import AddStudent from "./components/AddStudent";
import StudentListByPrn from "./components/ListStudentByPrn";
import StudentList from "./components/StudentList";
import Error from "./components/Error";
import Address from "./components/Address"

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<StudentList />} />
          <Route path="/student/:prn" element={<StudentListByPrn />} />
          <Route path="/student/add" element={<AddStudent />} />
          <Route path="/address/statesOfIndia" element={<Address />} />
          <Route element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
