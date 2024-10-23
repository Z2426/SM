import React, { useState, useTransition } from "react";
import { NoProfile } from "../assets";
import CustomButton from "./CustomButton";
const SaveCard = ({ post, user }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex justify-center h-full w-2/4 py-2 items-center">
        {post?.image && (
          <div className="w-full h-full bg-primary rounded-lg py-6 flex px-5 items-start justify-start">
            {post?.image && (
              <img
                src={post?.image ?? NoProfile}
                alt="post image"
                className=" w-32 h-32 shrink-0 object-cover rounded-lg "
              ></img>
            )}
            <div className="w-full h-full text-ascent-1 flex flex-col content-start px-4">
              <span className="text-xl font-medium">{post?.description}</span>
              <div className=" flex text-ascent-1 text-sm items-center gap-1">
                <img
                  src={post?.userId.profileUrl ?? NoProfile}
                  alt="post image"
                  className="w-7 h-7 shrink-0 object-cover rounded-full "
                ></img>
                <div className="flex items-center w-full h-full">
                  <span className="align-middle">
                    {post?.userId?.firstName} {post?.userId?.lastName}
                  </span>
                </div>
              </div>
              <div className="h-full"></div>
              <CustomButton
                tittle="Unsave"
                containerStyles="bg-blue w-fit px-5 py-2 rounded-xl"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveCard;
