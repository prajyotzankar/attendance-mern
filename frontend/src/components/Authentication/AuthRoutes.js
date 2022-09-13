import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { Route, Navigate } from "react-router-dom";
import axios from "axios";

export { AdminRoute };

// function AdminRoute({ component: Component, ...rest }) {
//   const authHeader = localStorage.getItem("AttendanceAppAuth");

//   axios
//     .post("http://localhost:5000/authentication/authenticate", {
//       headers: {
//         Authorization: `Bearer ${authHeader}`,
//       },
//     })
//     .then((response) => {
//       const authorizedUserTypes = ["admin"];
//       console.log(response, response.data.authentication);
//       const userType = response.data.authentication;
//       return (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!authorizedUserTypes.includes(userType)) {
//               // not logged in so Navigate to login page with the return url
//               return (
//                 <Navigate
//                   to={{ pathname: "/Login", state: { from: props.location } }}
//                 />
//               );
//             }

//             // authorized so return component
//             return <Component {...props} />;
//           }}
//         />
//       );
//     })
//     .catch((error) => {
//       console.log("server Error:  ", error);
//       return (
//         <Route
//           {...rest}
//           render={(props) => {
//             return (
//               <Navigate
//                 to={{ pathname: "/login", state: { from: props.location } }}
//               />
//             );
//           }}
//         />
//       );
//     });
// }

function AdminRoute() {
  try {
    const authHeader = localStorage.getItem("AttendanceAppAuth");
    const auth = axios
      .post("http://localhost:5000/authentication/authenticate", {
        headers: {
          Authorization: `Bearer ${authHeader}`,
        },
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });

    const authorizedUserTypes = ["admin"];
    console.log(auth, auth.data.authentication);
    const userType = auth.data.authentication;

    if (!authorizedUserTypes.includes(userType)) {
      return <Navigate to="/Login" />;
    }
    return <Outlet />;
  } catch (error) {
    return <Navigate to="/Login" replace={true} />;
  }
}

// function FacultyRoute({ component: Component, ...rest }) { }
// function StudentRoute({ component: Component, ...rest }) { }
