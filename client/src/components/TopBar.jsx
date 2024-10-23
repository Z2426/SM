import React, { useEffect, useState } from "react";
import { TbSocial } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TextInput from "./TextInput";
import CustomButton from "./CustomButton";
import { PiSignOut } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { BsMoon, BsSunFill } from "react-icons/bs";
import { IoChatboxOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaTools } from "react-icons/fa";
import { setTheme } from "../redux/theme";
import { Logout, Setnotification } from "../redux/userSlice";
import { fetchNotifications, fetchPosts } from "../until";
import Notification from "./Notification";
import { CiSettings } from "react-icons/ci";
import { UpdateProfile } from "../redux/userSlice";
import { IoIosSettings } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { NoProfile } from "../assets";
import { ProfileFix } from "../pages";
import EditFix from "./EditFix";
const TopBar = ({ user }) => {
  const { theme } = useSelector((state) => state.theme);
  const { notification, edit } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState();
  const [profilecard, setProfilecard] = useState();
  const [ava, setAva] = useState();
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

  const setAvatar = () => {
    setAva(!ava);
    // console.log(ava);
  };
  const handleSearch = async (data) => {
    await fetchPosts(user.token, dispatch, "", data);
  };
  const handleLogout = () => {
    setAva(!ava);
    dispatch(Logout());
  };
  // console.log(notifications);
  const fetchNotification = async () => {
    try {
      const res = await fetchNotifications({
        token: user?.token,
        userId: user?._id,
        dispatch,
      });
      // console.log(res);
      setNotifications(res.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotification();
  }, []);
  return (
    <div className="flex-col flex items-end select-none ">
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
          <img
            src={user?.profileUrl ?? NoProfile}
            className="w-14 h-14 object-cover rounded-full px-1 py-1 z-10"
            onClick={() => {
              setAvatar();
            }}
          />

          {/* <CustomButton
            onClick={() => dispatch(Logout())}
            tittle={"Logout"}
            containerStyles={
              "text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full"
            }
          /> */}
        </div>
      </div>

      {notification && (
        <div className="bg-primary">
          <div className="top-20 right-32 z-50 absolute w-1/5 overflow-auto border bg-primary rounded-xl text-ascent-1 h-1/2 border-[#66666690] justify-center flex">
            <Notification notify={notifications} />
          </div>
        </div>
      )}
      {ava && (
        <div className="bg-primary">
          <div className=" right-20 z-50 absolute w-fit overflow-auto border rounded-xl text-ascent-1 h-fit border-[#66666690] justify-center flex flex-col">
            <Link to={"/profilefix/" + user?._id} className="flex gap-2">
              <div className="w-full px-10 text-center py-3 font-medium cursor-pointer bg-primary hover:bg-bgColor  flex flex-col justify-evenly">
                <div className="flex justify-center items-center">
                  <img
                    src={user?.profileUrl ?? NoProfile}
                    className="w-10 h-10 object-cover rounded-full px-1 py-1 z-10"
                    onClick={() => {
                      setAvatar();
                    }}
                  />
                  Profile
                </div>
              </div>
            </Link>

            <div
              className="w-full text-center py-3 font-medium cursor-pointer bg-primary hover:bg-bgColor  flex justify-evenly"
              onClick={() => dispatch(UpdateProfile(true))}
            >
              <div className="flex justify-center items-center">
                <CiSettings size={30} />
                Setting
              </div>
            </div>
            <div
              className="w-full text-center py-3 font-medium cursor-pointer bg-primary hover:bg-bgColor flex justify-evenly"
              onClick={() => handleLogout()}
            >
              <div className="flex justify-center items-center ">
                <PiSignOut size={30} />
                Logout
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopBar;
