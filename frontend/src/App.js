import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

import Navbar from "./components/NavBar";
import AddStudent from "./components/StudentAdmitForm/AddStudent";
import StudentListByPrn from "./components/ShowStudentInfo/ListStudentByPrn";
import ListStudentInfo from "./components/ShowStudentInfo/ListStudentInfo";
import Login from "./components/Authentication/Login/Login";
import Registration from "./components/Authentication/Registration/Registration";
import Error from "./components/Error";
import { AdminRoute } from "./components/Authentication/AuthRoutes";

require("dotenv").config();

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<AdminRoute />}>
            <Route path="/" exact element={<ListStudentInfo />} />
            <Route path="/student/add" element={<AddStudent />} />
          </Route>
          <Route path="/student/:prn" element={<StudentListByPrn />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registration" element={<Registration />} />
          <Route element={<Error />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
