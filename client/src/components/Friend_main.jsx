import React, { useState } from "react";
import FriendCard from "./FriendCardRequest";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa";

const FriendMain = (user) => {
  const crollright = () => {
    let position = document.getElementById("request");
    position.scrollLeft += 200;
  };
  const crollleft = () => {
    let position = document.getElementById("request");
    position.scrollLeft -= 200;
  };

  return (
    <div>
      <div className="flex flex-col gap-2 h-fit relative select-none">
        <span className="text-ascent-1 font-bold text-3xl">
          Friend Requests
        </span>
        <div
          onClick={() => {
            crollright();
          }}
          className="absolute text-white bg-[#000000]/50 rounded-full w-12 h-12 flex justify-center cursor-pointer items-center bottom-1/2 right-4"
        >
          <FaAngleRight size={30} />
        </div>
        <div
          onClick={() => {
            crollleft();
          }}
          className="absolute text-white rotate-180 bg-[#000000]/50 rounded-full w-12 h-12 flex justify-center cursor-pointer items-center bottom-1/2 left-4"
        >
          <FaAngleRight size={30} />
        </div>
        <div
          id="request"
          className=" flex w-fit h-fit justify-start grow-0 overflow-x-auto gap-2 scroll-smooth"
        >
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
          <div className="h-fit w-fit flex-shrink-0">
            <FriendCard />
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-wrap gap-2 select-none">
        <span className="text-ascent-1 font-bold text-3xl">
          People you may know
        </span>
        <div className="flex justify-center items-center flex-col">
          <div className="w-2/3 h-fit flex gap-2 flex-wrap">
            {(() => {
              const items = [];
              for (let i = 0; i < 20; i++) {
                items.push(
                  <div className="w-44 h-fit">
                    <FriendCard />
                  </div>
                );
              }
              return items;
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};
export default FriendMain;
