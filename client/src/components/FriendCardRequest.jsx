import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NoProfile } from "../assets";
import CustomButton from "./CustomButton";
import { apiRequest } from "../until";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const FriendCardRequest = ({ user, setfriendRequest, friend, title }) => {
  console.log(title);
  console.log(friend);
  const navigate = useNavigate();
  const acceptFriendRequest = async (id, status) => {
    console.log(id);
    try {
      const res = await apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      console.log(res);

      setfriendRequest(res?.data);
      if (res?.status === "failed") {
        Cookies.set("message", res?.message, { expires: 7 });
        navigate("/error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(handle);
  // const { user } = useSelector((state) => state.user);
  // handle;
  return (
    <div>
      <div className="bg-primary overflow-hidden border h-fit w-fit rounded-lg border-[#66666645]">
        <img
          src={friend?.profileUrl ?? NoProfile}
          alt="Error"
          className="w-44 h-44  object-cover"
        />
        <div className="w-full h-full py-3 flex flex-col justify-center items-center font-bold gap-5">
          <span className="text-ascent-1 ">
            {friend?.firstName} {friend?.lastName}
          </span>
          <div className="w-4/5">
            <CustomButton
              tittle="Accept"
              onClick={() => acceptFriendRequest(friend?._id, "Accepted")}
              containerStyles="text-white bg-blue w-full rounded-lg inline-flex justify-center px-5 py-2"
            />
            <CustomButton
              tittle="Delete"
              onClick={() => acceptFriendRequest(friend?._id, "Denied")}
              // onClick={handle}
              containerStyles="text-ascent-1 bg-ascent-3/10 w-full rounded-lg inline-flex justify-center px-5 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCardRequest;
