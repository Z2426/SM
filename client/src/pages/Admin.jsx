import React, { useEffect, useState } from "react";
import { ProfileCard, TopBar } from "../components";
import { ListUser } from "../components/index";
import { useSelector } from "react-redux";
import { apiRequest } from "../until";

const Admin = () => {
  const { user } = useSelector((state) => state.user);
  const [listUser, setListUser] = useState();

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
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* {LEFT} */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
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
          </div>
          {/* {CENTTER} */}

          <div className="flex-1 h-full bg-primary px-4 flex flex-col overflow-y-auto rounded-lg items-center">
            <ListUser
              listUser={listUser}
              fetchUser={fetchUser}
              setListUser={setListUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
