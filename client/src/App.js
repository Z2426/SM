import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Profile,
  Register,
  ResetPassword,
  Chat,
  ErrorPage,
  ChangePassword,
  Admin,
} from "./pages";
import { useSelector } from "react-redux";
import PrivateRoute from "./until/privateroute";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  //console.log(user);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
}
function App() {
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  console.log(user?.role);
  return (
    <div className="w-full min-h-[100vh]" data-theme={theme.theme}>
      <Routes>
        {user?.role === "Admin" ? (
          <Route element={<Layout />}>
            {/* <PrivateRoute path="/" component={Home} allowedRoles={[]}/> */}
            <Route path="/" element={<Admin />} />
          </Route>
        ) : (
          <Route element={<Layout />}>
            {/* <PrivateRoute path="/" component={Home} allowedRoles={[]}/> */}
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/chat/:id?" element={<Chat />} />
          </Route>
        )}

        <Route path="/error" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
