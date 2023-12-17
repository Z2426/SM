import React from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { setTheme } from "../redux/theme";
import { Logout, Setnotification } from "../redux/userSlice";
import { fetchPosts } from "../until";
const TopBarAdmin = ({ user }) => {
  const { theme } = useSelector((state) => state.theme);
  const { notification } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(setTheme(themeValue));
  };
  // const handleSearch = async (data) => {
  //   await fetchPosts(user.token, dispatch, "", data);
  // };
  return (
    <div
      className="topbar w-full flex items-center justify-between py-3
    md:py-6 px-4 bg-primary"
    >
      <Link to="/" className="flex gap-2 items-center">
        <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
          <TbSocial />
        </div>
        <span className="text-xl md:text-2xl text-[#065ad8] rounded ">
          ADMIN
        </span>
      </Link>

      {/* {ICON} */}
      <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
        <button onClick={() => handleTheme()}>
          {theme ? <BsMoon /> : <BsSunFill />}
        </button>
        {/* <div className="hidden lg:flex">
          <Link to={`/chat/${user?._id}`}>
            <IoChatboxOutline />
          </Link>
        </div> */}
        {/* <div
          className="hidden lg:flex cursor-pointer"
          onClick={() => dispatch(Setnotification(!notification))}
        >
          <IoMdNotificationsOutline />
        </div> */}

        <CustomButton
          onClick={() => dispatch(Logout())}
          tittle={"Logout"}
          containerStyles={
            "text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
          }
        />
      </div>
    </div>
  );
};

export default TopBarAdmin;
