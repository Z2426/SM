import React from "react";
import { NoProfile } from "../assets";
import moment from "moment";
const Notification = ({ notify }) => {
  return (
    <div className="relative w-full shadow-sm rounded-lg px-6 py-5">
      <div
        className="flex items-center justify-between text-xl text-ascent-1 
            pb-2 border-b border-[#66666645f]"
      >
        <span> Notification</span>
        <span>{notify?.length}</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {notify?.map(({ _id, content, createdBy: from, createdAt }) => (
          <div key={_id} className="flex items-center justify-between">
            <div
              className="w-full flex gap-4 items-center 
                          "
            >
              <img
                src={from?.profileUrl ?? NoProfile}
                alt={from?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {from?.firstName} {from?.lastName}{" "}
                </p>
                <span className="hidden md:flex text-ascent-2">
                  {moment(createdAt ?? "2023-05-25").fromNow()}
                </span>
                <span className="text-sm text-ascent-2">
                  {content ?? "Something Wrong"}
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
