import React, { useEffect, useState } from "react";
import { FriendCard, FriendMain, TopBar } from "../components";
import { Link, redirect, useNavigate } from "react-router-dom";
import { NoProfile } from "../assets";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { GiThreeFriends } from "react-icons/gi";
import { FaAngleRight } from "react-icons/fa";
const Friend = () => {
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(true);
  const { user } = useSelector((state) => state.user);
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
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full justify-between">
          <div className="w-1/5 h-full md:flex flex-col gap-6 overflow-y-auto flex-initial bg-primary rounded-lg">
            <div className="bg-primary w-full h-fit rounded-lg flex flex-col gap-3 overflow-hidden">
              <Link
                to={"/frienddetails"}
                className="flex gap-2 hover:bg-secondary w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FaUserFriends size={30} />
                  </div>
                  Friend Request
                </span>
              </Link>

              <Link
                to={"/frienddetails"}
                className="flex gap-2 hover:bg-secondary w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center  ">
                    <FaUserFriends size={30} />
                  </div>
                  Suggestions
                </span>
              </Link>
              <Link
                to={"/frienddetails"}
                className="flex gap-2 hover:bg-secondary w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center  ">
                    <GiThreeFriends size={30} />
                  </div>
                  All Friends
                </span>
              </Link>
            </div>
          </div>
          <div className=" justify-center h-full flex-initial w-4/5 flex-wrap px-4 py-4 flex gap-6 overflow-y-auto rounded-lg">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friend;
