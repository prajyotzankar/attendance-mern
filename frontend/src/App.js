import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/Navbar";
import AddStudent from "./components/StudentAdmitForm/AddStudent";
import StudentListByPrn from "./components/ListStudentByPrn";
import StudentList from "./components/StudentList";
import Error from "./components/Error";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<StudentList />} />
          <Route path="/student/:prn" element={<StudentListByPrn />} />
          <Route path="/student/add" element={<AddStudent />} />
          <Route element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
