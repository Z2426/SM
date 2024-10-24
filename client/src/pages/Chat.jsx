import React, { useEffect, useState } from "react";
import {
  FriendsCard,
  ProfileCard,
  TextInput,
  TopBar,
  ImageCheck,
} from "../components";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { IoIosChatbubbles, IoIosSettings, IoMdContact } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Picker from "emoji-picker-react";
import { NoProfile } from "../assets";
const UserCard = (user) => {
  //console.log(user);
  return (
    <div className="w-full gap-4 flex py-5 px-5 rounded-2xl hover:bg-ascent-3/30 items-center">
      <img
        src={user?.user?.profileUrl}
        alt={user?.firstName}
        className="w-14 h-14 object-cover rounded-full"
      />
      <div className="flex-col flex h-full justify-center">
        <span className="text-ascent-1">Name</span>
        <span className="text-ascent-2">Nội dung gần nhất</span>
      </div>
    </div>
  );
};

const Chat = () => {
  const { user, edit } = useSelector((state) => state.user);
  const { id } = useParams();
  const [chat, setChat] = useState("");
  const { theme } = useSelector((state) => state.theme);
  const [showPicker, setShowPicker] = useState(false);
  const [review, setReview] = useState();
  const [reviewcheck, setReviewcheck] = useState(false);
  // console.log(user);
  const onEmojiClick = (e) => {
    setChat((prevInput) => prevInput + e.emoji);
    setShowPicker(false);
  };
  const handlebg = (e) => {
    console.log(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setReview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    // setPreview(true);
  };
  return (
    <div>
      <div
        className=" flex flex-col home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
    lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full">
          {/* {LEFT} */}
          <div className="h-full w-20 rounded-xl bg-primary overflow-hidden">
            <div className="w-full h-2/3 gap-7 flex flex-col items-center content-end justify-start py-10 ">
              <IoIosChatbubbles className="text-ascent-1 " size={30} />
              <IoCallSharp className="text-ascent-1 " size={30} />
              <IoMdContact className="text-ascent-1 " size={30} />
              {/* <IoIosSettings className=" text-ascent-1 " size={30} /> */}
            </div>

            <div className="h-1/3 w-full bg-primary flex justify-center items-end py-10">
              <IoIosSettings className=" text-ascent-1 " size={30} />
            </div>
          </div>
          <div
            className="w-1/5 lg:w-1/5 h-full bg-primary md:flex flex-col gap-1
        overflow-y-auto rounded-xl grow-0"
          >
            <div>
              <div className="w-full font-bold text-ascent-1 text-3xl px-5 py-5">
                Chat
              </div>
              <div className="w-full flex flex-col items-center px-4">
                <input
                  type="text"
                  className="px-5 bg-secondary text-ascent-2 rounded-full w-full border border-[#66666690] 
            outline-none text-sm  
             py-3 placeholder:text-ascent-2"
                  placeholder="Search"
                />
              </div>
            </div>

            <div className="w-full h-full gap-3 flex flex-col pt-2">
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
            </div>
            {/* <FriendsCard friends={user?.friends} /> */}
          </div>
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {/* Phần tiêu đề của khung chat */}
            <div className="flex w-full justify-between mt-3 border-b border-[#66666645] pb-3 select-none px-3">
              <div className="text-ascent-1 font-bold text-3xl">
                <div className=" flex text-ascent-1 text-sm items-center gap-1">
                  <img
                    src={user?.profileUrl ?? NoProfile}
                    alt="post image"
                    className="w-14 h-14 shrink-0 object-cover rounded-full "
                  ></img>
                  <div className="flex items-center w-full h-full">
                    <span className="align-middle">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <IoCallSharp className="text-ascent-1 " size={25} />
              </div>
            </div>

            {/* Phần nội dung của khung chat */}
            <div className="flex-1 overflow-y-auto">
              {/* Danh sách tin nhắn */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center text-ascent-2"></div>
                  <div className="flex flex-col gap-5">
                    <div className="w-full">
                      <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 w-2/3">
                        <p className="text-ascent-1 px-2 py-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Soluta natus architecto eum deserunt facere
                          enim? Aliquam laborum repellendus, placeat vero
                          laboriosam quo in blanditiis nihil ullam debitis
                          quisquam eum recusandae! Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore fugiat aliquam,
                          quas facilis atque distinctio corrupti expedita fugit
                          deleniti eligendi, libero rerum quam. Amet at deleniti
                          aliquam? Tenetur, similique voluptatibus?Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Soluta
                          natus architecto eum deserunt facere enim? Aliquam
                          laborum repellendus, placeat vero laboriosam quo in
                          blanditiis nihil ullam debitis quisquam eum
                          recusandae! Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Labore fugiat aliquam, quas facilis
                          atque distinctio corrupti expedita fugit deleniti
                          eligendi, libero rerum quam. Amet at deleniti aliquam?
                          eleniti eligendi, libero rerum quam. Amet at deleniti
                          aliquam? Tenetur, similique voluptatibus?Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Soluta
                          natus architecto eum deserunt facere enim? Aliquam
                          laborum repellendus, placeat vero laboriosam quo in
                          blanditiis nihil ullam debitis quisquam eum
                          recusandae! Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Labore fugiat aliquam, quas facilis
                          atque distinctio corrupti expedita fugit deleniti
                          eligendi, libero rerum quam. Amet at deleniti aliquam?
                        </p>
                      </div>
                    </div>
                    <div className="w-full flex justify-center">
                      <span className="text-ascent-1 ">Date nn/mm time</span>
                    </div>
                    <div className="w-full flex justify-center">{}</div>
                    <div className="w-full flex justify-end">
                      <div className="bg-blue p-2 border rounded-xl ml-2 w-2/3">
                        <p className="text-white px-2 py-2">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Soluta natus architecto eum deserunt facere
                          enim? Aliquam laborum repellendus, placeat vero
                          laboriosam quo in blanditiis nihil ullam debitis
                          quisquam eum recusandae! Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore fugiat aliquam,
                          quas facilis atque distinctio corrupti expedita fugit
                          deleniti eligendi, libero rerum quam. Amet at deleniti
                          aliquam? Tenetur, similique voluptatibus?Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Soluta
                          natus architecto eum deserunt facere enim? Aliquam
                          laborum repellendus, placeat vero laboriosam quo in
                          blanditiis nihil ullam debitis quisquam eum
                          recusandae! Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Labore fugiat aliquam, quas facilis
                          atque distinctio corrupti expedita fugit deleniti
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Soluta natus architecto eum deserunt facere
                          enim? Aliquam laborum repellendus, placeat vero
                          laboriosam quo in blanditiis nihil ullam debitis
                          quisquam eum recusandae! Lorem ipsum dolor sit amet
                          consectetur adipisicing elit. Labore fugiat aliquam,
                          quas facilis atque distinctio corrupti expedita fugit
                          deleniti eligendi, libero rerum quam. Amet at deleniti
                          aliquam? Tenetur, similique voluptatibus?Lorem ipsum
                          dolor sit amet consectetur adipisicing elit. Soluta
                          natus architecto eum deserunt facere enim? Aliquam
                          laborum repellendus, placeat vero laboriosam quo in
                          blanditiis nihil ullam debitis quisquam eum
                          recusandae! Lorem ipsum dolor sit amet consectetur
                          adipisicing elit. Labore fugiat aliquam, quas facilis
                          atque distinctio corrupti expedita fugit deleniti
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phần nhập tin nhắn */}
            <div className="relative flex flex-col items-start">
              <div className="absolute bottom-20 right-20">
                {showPicker && (
                  <Picker
                    className=""
                    theme={theme}
                    onEmojiClick={onEmojiClick}
                  />
                )}
              </div>
              {review && (
                <div className="relative flex h-20 w-20 bg-bgColor rounded-2xl overflow-hidden mx-2 my-2">
                  <div className="overflow-hidden ">
                    <img
                      src={review}
                      className="h-20 w-20 object-contain cursor-pointer"
                      onClick={() => {
                        setReviewcheck(!reviewcheck);
                        setReview(review);
                      }}
                    />
                  </div>
                  <div
                    onClick={() => {
                      setReview(null);
                      // setTemp(null);
                    }}
                    className="rotate-45 cursor-pointer absolute right-1 top-1 bg-[#000000] rounded-full opacity-70 w-1/3 h-1/3 text-white flex justify-center items-center"
                  >
                    <AiOutlinePlus size={15} className="font-thin" />
                  </div>
                </div>
              )}

              <div className="flex w-full mb-3 justify-center items-center">
                <div
                  className="h-full w-fit text-ascent-1 px-1 py-2 flex justify-center items-center"
                  onClick={() => {}}
                >
                  <label className="bg-primary rounded-xl cursor-pointer">
                    <CiCirclePlus size={35} />
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg, .png, .jpeg"
                      onInput={(e) => {
                        handlebg(e);
                      }}
                    />
                  </label>
                </div>

                <div className=" overflow-hidden w-full h-full flex justify-center items-center border bg-bgColor rounded-full focus:outline-none focus:ring focus:border-blue">
                  <input
                    type="text"
                    value={chat}
                    onChange={(e) => {
                      setChat(e.target.value);
                    }}
                    placeholder="Type your message..."
                    className="w-full flex-1 py-2 px-5 text-ascent-1 rounded-full bg-bgColor focus:outline-0 text-wrap"
                  />
                  <div
                    className="h-full w-fit text-ascent-1 px-1 py-2 flex justify-center items-center  "
                    onClick={() => {
                      setShowPicker(!showPicker);
                    }}
                  >
                    <MdEmojiEmotions size={35} />
                  </div>
                </div>

                <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 bg-blue ">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
        {reviewcheck && (
          <ImageCheck
            img={review}
            review={reviewcheck}
            setReview={setReviewcheck}
          />
        )}
      </div>
    </div>
  );
};

export default Chat;
