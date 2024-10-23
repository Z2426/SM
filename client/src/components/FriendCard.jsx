import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NoProfile } from "../assets";
import CustomButton from "./CustomButton";
const FriendCard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <div className="bg-primary overflow-hidden border h-fit w-fit rounded-lg border-[#66666645]">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="Error"
          className="w-44 h-44  object-cover"
        />
        <div className="w-full h-full py-3 flex flex-col justify-center items-center font-bold gap-5">
          <span className="text-ascent-1 ">
            {user?.firstName} {user?.lastName}
          </span>
          <div>
            <CustomButton
              tittle="Add"
              containerStyles="text-white bg-blue w-full rounded-lg inline-flex justify-center px-5 py-2"
            />
            <CustomButton
              tittle="Delete"
              containerStyles="text-ascent-1 bg-ascent-3/10 w-full rounded-lg inline-flex justify-center px-5 py-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
