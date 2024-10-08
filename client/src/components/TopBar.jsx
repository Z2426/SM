import React, { useEffect, useState } from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { setTheme } from "../redux/theme";
import { Logout, Setnotification } from "../redux/userSlice";
import { fetchNotifications, fetchPosts } from "../until";
import Notification from "./Notification";
const TopBar = ({ user }) => {
  const { theme } = useSelector((state) => state.theme);
  const { notification } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleTheme = () => {
    const themeValue = theme === "light" ? "dark" : "light";

    dispatch(setTheme(themeValue));
  };
  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };
  console.log(notifications);
  const fetchNotification = async () => {
    try {
      const res = await fetchNotifications({
        token: user?.token,
        userId: user?._id,
        dispatch,
      });
      console.log(res);
      setNotifications(res.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <div className="flex-col flex items-end">
      <div
        className="topbar w-full flex items-center justify-between py-3
  md:py-6 px-4 bg-primary"
      >
        <Link to="/" className="flex gap-2 items-center">
          <div className="p-1 md:p-2 bg-[#065ad8] rounded text-white">
            <TbSocial />
          </div>
          <span className="text-xl md:text-2xl text-[#065ad8] rounded ">
            SOCIAL MEIDA
          </span>
        </Link>
        {/* <FaTools /> */}

        <form
          className="hidden md:flex items-center justify-center"
          onSubmit={handleSubmit(handleSearch)}
        >
          <TextInput
            placeholder="Search..."
            styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3"
            register={register("search")}
          />
          <CustomButton
            tittle="search"
            type="submit"
            containerStyles="bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full"
          />
        </form>

        {/* {ICON} */}

        <div className="flex gap-4 items-center text-ascent-1 text-md md:text-xl">
          {user?.role === "Admin" && (
            <div className="hidden lg:flex cursor-pointer">
              <Link to={`/admin`}>
                <FaTools />
              </Link>
            </div>
          )}

          <button onClick={() => handleTheme()}>
            {theme ? <BsMoon /> : <BsSunFill />}
          </button>
          <div className="hidden lg:flex">
            <Link to={`/chat/${user?._id}`}>
              <IoChatboxOutline />
            </Link>
          </div>
          <div
            className="hidden lg:flex cursor-pointer"
            onClick={() => dispatch(Setnotification(!notification))}
          >
            <IoMdNotificationsOutline />
          </div>

          <CustomButton
            onClick={() => dispatch(Logout())}
            tittle={"Logout"}
            containerStyles={
              "text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
            }
          />
        </div>
      </div>

      {notification && (
        <div className="bg-bgColor">
          <div className="top-20 right-32 z-50 absolute w-1/5 overflow-auto border bg-bgColor rounded text-ascent-1 h-1/2 border-[#66666690] justify-center flex">
            <Notification notify={notifications} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
