import React, { useState, useTransition } from "react";
import { NoProfile } from "../assets";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
const SaveCard = ({ post, user }) => {
  console.log(post);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex justify-center h-full w-2/4 py-2 items-center">
        <div className="w-full h-full bg-primary rounded-lg py-6 flex px-5 items-start justify-start">
          <img
            src={post?.image ?? NoProfile}
            alt="post image"
            className=" w-32 h-32 shrink-0 object-cover rounded-lg "
          ></img>
          <div className="w-full h-full text-ascent-1 flex flex-col content-start px-4">
            <Link
              to={"/post/" + post?._id}
              className="hover:underline-offset-4"
            >
              <span className="text-xl font-medium hover:underline hover:underline-offset-3 pb-2 transition delay-1000">
                {post?.description}
              </span>
            </Link>
            <div className=" flex text-ascent-1 text-sm items-center gap-1">
              <img
                src={post?.userId?.profileUrl ?? NoProfile}
                alt="post image"
                className="w-5 h-5 shrink-0 object-cover rounded-full "
              ></img>
              <div className="flex items-center w-full h-full">
                <span className="align-middle text-ascent-2">
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
      </div>
    </div>
  );
};

export default SaveCard;
