import React, { useState } from "react";
import { FriendsCard, ProfileCard, TextInput, TopBar } from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { id } = useParams();
  return (
    <div>
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
    lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* {LEFT} */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
        overflow-y-auto"
          >
            <ProfileCard user={user} />
            <FriendsCard friends={user?.friends} />
          </div>
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {/* Phần tiêu đề của khung chat */}
            <div className="text-white font-bold text-lg">Chat Room</div>

            {/* Phần nội dung của khung chat */}
            <div className="flex-1 overflow-y-auto">
              {/* Danh sách tin nhắn */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center"></div>
                  <div className="bg-white p-2 rounded-md ml-2">
                    <p className="text-black">
                      {" "}
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Soluta natus architecto eum deserunt facere enim? Aliquam
                      laborum repellendus, placeat vero laboriosam quo in
                      blanditiis nihil ullam debitis quisquam eum recusandae!
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Labore fugiat aliquam, quas facilis atque distinctio
                      corrupti expedita fugit deleniti eligendi, libero rerum
                      quam. Amet at deleniti aliquam? Tenetur, similique
                      voluptatibus?Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Soluta natus architecto eum deserunt
                      facere enim? Aliquam laborum repellendus, placeat vero
                      laboriosam quo in blanditiis nihil ullam debitis quisquam
                      eum recusandae! Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Labore fugiat aliquam, quas facilis
                      atque distinctio corrupti expedita fugit deleniti
                      eligendi, libero rerum quam. Amet at deleniti aliquam?
                      Tenetur, similique voluptatibus?Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Soluta natus architecto eum
                      deserunt facere enim? Aliquam laborum repellendus, placeat
                      vero laboriosam quo in blanditiis nihil ullam debitis
                      quisquam eum recusandae! Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Labore fugiat aliquam, quas
                      facilis atque distinctio corrupti expedita fugit deleniti
                      eligendi, libero rerum quam. Amet at deleniti aliquam?
                      Tenetur, similique voluptatibus?Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Soluta natus architecto eum
                      deserunt facere enim? Aliquam laborum repellendus, placeat
                      vero laboriosam quo in blanditiis nihil ullam debitis
                      quisquam eum recusandae! Lorem ipsum dolor sit amet
                      consectetur adipisicing elit. Labore fugiat aliquam, quas
                      facilis atque distinctio corrupti expedita fugit deleniti
                      eligendi, libero rerum quam. Amet at deleniti aliquam?
                      Tenetur, similique voluptatibus?
                    </p>
                  </div>
                </div>
                {/* Thêm tin nhắn khác tương tự */}
              </div>
            </div>

            {/* Phần nhập tin nhắn */}
            <div className="flex items-center ">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-full focus:outline-none focus:ring focus:border-blue-300 bg-bgColor mb-5"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2  bg-bgColor mb-5">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
