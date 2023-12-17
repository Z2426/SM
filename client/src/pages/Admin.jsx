import React, { useEffect, useState } from "react";
import {
  EditProfile,
  Notification,
  ProfileCard,
  TopBarAdmin,
} from "../components/index";
import { ListUser } from "../components/index";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest, fetchNotifications } from "../until";

const Admin = () => {
  const [notifications, setNotifications] = useState();
  const { user, edit } = useSelector((state) => state.user);
  const [listUser, setListUser] = useState();
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const fetchUser = async () => {
    const uri = "/admin/show-all-user";
    const data = {
      user: { userId: user?._id },
    };

    const res = await apiRequest({
      url: uri,
      token: user?.token,
      data,
      method: "GET",
    });
    setListUser(res?.data);
    console.log(res);
  };

  const fetchNotification = async () => {
    try {
      const res = await fetchNotifications({
        token: user?.token,
        userId: user?._id,
        dispatch,
      });
      //console.log(res);
      setNotifications(res.notifications);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  // fetchUser();
  useEffect(() => {
    fetchUser();
    fetchNotification();
  }, []);
  return (
    <div className="">
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
lg:rounded-lg h-screen overflow-hidden"
      >
        <div className="flex flex-col items-end ">
          <TopBarAdmin user={user} />
          {/* <div className=" relative w-1/6 h-1/4 bg-bgColor border border-[#66666690] rounded-sm text-ascent-1">
            <span>Notication</span>
          </div> */}
        </div>
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* {LEFT} */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col 
        overflow-y-auto bg-primary overflow-hidden"
          >
            {/* <span
              className="bg-secondary rounded py-4 mx-3 border border-[#66666690] 
            outline-none text-ascent-1 text-3xl text-center cursor- border rounded-full"
            >
              List User
            </span>
            <span
              className="bg-secondary rounded py-4 mx-3  border border-[#66666690] 
            outline-none text-ascent-1 text-3xl text-center cursor- border rounded-full"
            >
              User History
            </span>
            <span
              className="bg-secondary rounded py-4 mx-3 border border-[#66666690] 
            outline-none text-ascent-1 text-3xl text-center cursor- border rounded-full"
            >
              List User
            </span> */}
            <ProfileCard user={user} />
            <Notification notify={notifications} />
          </div>
          {/* {CENTTER} */}

          <div className="flex-1 w-full h-full bg-primary px-4 flex flex-col overflow-y-auto rounded-lg items-center">
            <ListUser
              listUser={listUser}
              fetchUser={fetchUser}
              setListUser={setListUser}
            />
          </div>
        </div>
      </div>

      {edit && <EditProfile />}
    </div>
  );
};

export default Admin;
