import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import React from "react";
const userRoles = {
  admin: "admin",
  user: "user",
};

const isAuthenticated = () => {
  // Mô phỏng người dùng đã đăng nhập và có role là 'admin'
  return { authenticated: true, role: userRoles.admin };
};

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const authInfo = isAuthenticated();

      if (authInfo.authenticated && allowedRoles.includes(authInfo.role)) {
        return <Component {...props} />;
      }
      //   } else {
      //     return <Redirect to="/login" />;
      //   }
    }}
  />
);

export default PrivateRoute;
