import React, { useState } from "react";
import { NoProfile } from "../assets";
import moment from "moment";
import { Logout } from "../redux/userSlice";
const Notification = ({ notify }) => {
  console.log(notify);
  const [all, setAll] = useState(true);
  const [bg, setBG] = useState();
  const check = () => {
    all ? setBG("bg-blue") : setBG(" hover:bg-ascent-3");
  };

  return (
    <div className="relative w-full shadow-sm rounded-full  py-5">
      <div
        className="flex flex-col text-2xl text-ascent-1 
              mx-6 gap-2 mb-2"
      >
        <span className="font-medium "> Notification</span>
        <div className="font-normal text-base">
          <span
            className={`w-fit  px-3 py-1 text-ascent-1 rounded-full hover:bg-bgColor cursor-pointer ${bg}`}
          >
            All
          </span>
          <span
            className={`w-fit  px-3 py-1 text-ascent-1 rounded-full hover:bg-bgColor cursor-pointer ${bg}`}
          >
            Unread
          </span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 pb-2 ">
        {notify?.map(({ _id, content, createdBy: from, createdAt }) => (
          <div
            key={_id}
            className="flex items-center justify-between px-6 hover:bg-bgColor"
          >
            <div className="w-full flex gap-4 items-center ">
              <img
                src={from?.profileUrl ?? NoProfile}
                alt={from?.firstName}
                className="w-16 h-16  object-cover rounded-full"
              />
              <div className="flex-1 ">
                <p className="text-base font-bold text-ascent-1 ">
                  {from?.firstName} {from?.lastName}{" "}
                </p>

                <span className="text-sm text-ascent-2 ">
                  {content
                    ? content?.length > 50
                      ? content.slice(0, 50) + "..."
                      : content
                    : "Wrong"}
                </span>
                <span className="hidden md:flex text-ascent-2 text-xs">
                  {moment(createdAt ?? "2023-05-25").fromNow()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
