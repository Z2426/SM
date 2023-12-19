import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userSlice";
import Cookies from "js-cookie";

const ErrorPage = () => {
  //const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("message="));
  const message = cookieValue
    ? decodeURIComponent(cookieValue.split("=")[1])
    : null;
  console.log(message);
  const removeCookie = () => {
    Cookies.remove("message");
  };
  return (
    <div className="bg-bgColor w-full h-[100vh] flex items-center justify-center p-6">
      <div
        className="w-full md:w-1/3 h-1/5 lg:h-1/2 2xl:h-5/6 py-8 lg:py-0
       bg-primary rounded-x1 overflow-hidden shadow-xl items-center justify-center"
      >
        <div
          className="w-full lg:w=1/2 h-full p-10 2xl:px-20 flex flex-col
        justify-center items-center"
        >
          <span className="text-6xl text-center text-ascent-1 pb-10">
            Error
          </span>
          <span className="text-ascent-2 pb-10 text-2xl text-center">
            {message}
          </span>

          <Link to={"/login"}>
            <button
              className={`inline-flex text-base bg-[#0444a4] text-white px-5 py-2.5 mt-2 rounded-full justify-center`}
              onClick={() => {
                removeCookie();
                dispatch(Logout());
              }}
            >
              Go To Login Page
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
