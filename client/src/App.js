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
  ProfileFix,
  PostPage,
  Friend,
  ProfileDetail,
  Search,
  Save,
} from "./pages";
import { useSelector } from "react-redux";
import PrivateRoute from "./until/privateroute";

function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  //console.log(location);
  //console.log(user?.token);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
}
function App() {
  const theme = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  //console.log(user);
  //console.log(user?.role);
  return (
    <div className="w-full min-h-[100vh]" data-theme={theme.theme}>
      <Routes>
        {user?.role === "Admin" ? (
          <Route element={<Layout />}>
            <Route path="/admin" element={<Admin />} />

            <Route path="/" element={<Home />} />
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/chat/:id?" element={<Chat />} />
          </Route>
        ) : (
          <Route element={<Layout />}>
            {/* <Route path="/admin" element={<Admin />} /> */}
            <Route path="/" element={<Home />} />
            <Route path="/friend" element={<Friend />} />
            <Route path="/frienddetails" element={<ProfileDetail />} />
            <Route path="/profile/:id?" element={<Profile />} />
            <Route path="/chat/:id?" element={<Chat />} />
            <Route path="/post/:id?" element={<PostPage />} />
            <Route path="/search" element={<Search />} />
            <Route path="/save" element={<Save />} />
          </Route>
        )}

        {/* <Route element={<Layout />}>
          {user?.role === "Admin" && (
            <Route path="/admin" element={<Admin />} />
          )}
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id?" element={<Profile />} />
          <Route path="/chat/:id?" element={<Chat />} />
        </Route> */}
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:id/:token" element={<ChangePassword />} />
        <Route path="/profilefix/:id?" element={<ProfileFix />} />
      </Routes>
    </div>
  );
}

export default App;
