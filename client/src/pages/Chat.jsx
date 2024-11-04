import React, { useEffect, useRef, useState } from "react";
import {
  FriendsCard,
  ProfileCard,
  TextInput,
  TopBar,
  ImageCheck,
} from "../components";
import { IoIosContact } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { FaVideo } from "react-icons/fa";
import { IoIosChatbubbles, IoIosSettings, IoMdContact } from "react-icons/io";
import { IoCallSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import Picker from "emoji-picker-react";
import { BgImage, NoProfile } from "../assets";
const UserCard = ({ user, event }) => {
  console.log(12313141413);

  console.log(user);
  return (
    <div
      className="w-full gap-4 flex py-5 px-5 rounded-2xl hover:bg-ascent-3/30 items-center"
      onClick={event}
    >
      <img
        src={user?.profileUrl ?? NoProfile}
        alt={user?.firstName}
        className="w-14 h-14 object-cover rounded-full"
      />
      <div className="flex-col w-full flex h-full justify-center">
        <div className="flex justify-between">
          <span className="text-ascent-1">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-ascent-2 ">time</span>
        </div>
        <span className="text-ascent-2">
          {user?.chat.length > 50
            ? user?.chat.slice(0, 30) + "..."
            : user?.chat}
        </span>
      </div>
    </div>
  );
};

const Pagechat_1 = () => {
  return (
    <div className="flex flex-col gap-2 w-full overflow-auto h-full">
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Chào anh/chị, em có thể giúp gì cho anh/chị?
          </p>
        </div>
      </div>

      {/* <div className="w-full flex justify-center">
        <span className="text-ascent-1 ">20/10/2024</span>
      </div> */}
      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Dạ, anh/chị quan tâm đến dòng nào ạ? Hiện tại bên em có rất nhiều
            mẫu điện thoại với camera chất lượng cao như Samsung Galaxy S23,
            iPhone 14 Pro Max,...
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Em giới thiệu cho anh chiếc nào pin trâu với, anh hay đi công tác.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Chào em, em tư vấn cho anh một chiếc điện thoại chụp hình đẹp với.
          </p>
        </div>
      </div>

      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Dạ, với nhu cầu của anh thì em khuyên anh nên tham khảo dòng Samsung
            Galaxy A series hoặc iPhone 13. Hai dòng này đều có pin rất tốt và
            nhiều tính năng hữu ích.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Vậy em cho anh so sánh hai dòng này với nhau được không?
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Dạ được ạ, Samsung Galaxy A series thường có giá thành phải chăng
            hơn, trong khi iPhone 13 thì hệ điều hành ổn định và bảo mật cao
            hơn.
          </p>
        </div>
      </div>

      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Vậy anh sẽ cân nhắc thêm. Cảm ơn em.
          </p>
        </div>
      </div>
    </div>
  );
};

const Pagechat_2 = () => {
  return (
    <div className="flex flex-col gap-2 w-full overflow-auto h-full">
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Mình nghĩ chúng ta nên có một cuộc họp để bàn về dự án X. Bạn có
            rảnh vào thứ Tư tuần sau không? Cụ thể là tầm 2h chiều thì sao?
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Thứ Tư tuần sau thì mình hơi bận rồi. Thứ Hai lúc 10h sáng hoặc thứ
            Ba lúc 14h chiều thì mình đều có thể sắp xếp.
          </p>
        </div>
        {/* <img src={BgImage} alt="" className="w-1/3 p-2 ml-2 rounded-3xl" /> */}
      </div>

      <div className="w-full flex justify-center">
        <span className="text-ascent-1 ">20/10/2024</span>
      </div>
      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Thứ Hai lúc 10h sáng nghe ổn đó. Phòng họp 3 có sẵn không nhỉ? Phòng
            đó khá yên tĩnh và đầy đủ tiện nghi.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Ok, phòng họp 3 rất phù hợp. Vậy là mình sẽ họp vào thứ Hai lúc 10h
            sáng tại phòng họp 3 nhé.
          </p>
        </div>
      </div>
    </div>
  );
};

const Pagechat_3 = () => {
  return (
    <div className="flex flex-col gap-2 w-full overflow-auto h-full">
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Này Bình, mình rảnh trưa nay nè. Đi ăn trưa không?
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Có chỗ mới khai trương gần công ty mình, nghe nói đồ ăn ngon lắm!
          </p>
        </div>
        <img src={BgImage} alt="" className="w-1/3 p-2 ml-2 rounded-3xl" />
      </div>

      <div className="w-full flex justify-center">
        <span className="text-ascent-1 ">20/10/2024</span>
      </div>
      <div className="w-full flex justify-center"></div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Uh, hay quá đi! Mình cũng đói meo rồi.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Mình đi nhé! Khoảng 12h mình qua đón bạn.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            À, bạn muốn ăn gì đặc biệt không? Mình đặt trước luôn.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Ok, mình không kén ăn đâu. Bạn quyết định đi.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Nhưng mà mình thích ăn đồ Nhật lắm đấy.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Nếu có sushi hoặc ramen thì tuyệt vời luôn.💕
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Yên tâm, mình nhớ rồi. Mình sẽ đặt một bàn ở quán sushi đó.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Gặp bạn lúc 12h nhé!
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            Ok, hẹn gặp bạn lúc 12h.
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="bg-ascent-3/10 p-2 border rounded-xl ml-2 max-w-2xl w-fit">
          <p className="text-justify text-ascent-1 px-2 py-2 w-fit">
            À, nhớ mang theo ví đấy nhé, kẻo lại tranh nhau trả tiền.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">
            Haha, yên tâm đi. Mình mang theo đủ rồi.
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="bg-blue p-2 border rounded-xl ml-2 max-w-2xl">
          <p className="text-justify text-white px-2 py-2">See you soon!</p>
        </div>
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
  const myDivRef = useRef(null);
  const [page, setPage] = useState(1);
  const [userinfo, setUserinfo] = useState(user);
  const [listmanager, setListmanager] = useState([
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "Nguyễn",
      following: [],
      friends: [],
      lastName: "Takt",
      location: "VietNam",
      chat: "Vậy anh sẽ cân nhắc thêm. Cảm ơn em.",
      profileUrl:
        "https://res.cloudinary.com/dr91wukb1/image/upload/v1730531001/SOCIALMEDIA/g2og0hxbfrh56oiadfum.png",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
      page: 1,
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "smith",
      location: "VietNam",
      chat: " Ok, phòng họp 3 rất phù hợp. Vậy là mình sẽ họp vào thứ Hai lúc 10h sáng tại phòng họp 3 nhé.",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
      page: 2,
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "Nguyễn",
      following: [],
      friends: [],
      lastName: "Huy",
      location: "VietNam",
      chat: "See you soon!",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
      page: 3,
    },
  ]);

  // console.log(user);
  const onEmojiClick = (e) => {
    setChat((prevInput) => prevInput + e.emoji);
    setShowPicker(false);
  };

  const handlepage = (id) => {
    setPage(id);
  };

  const onchangepage = async (id) => {
    await handlepage(id);
    position();
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
  const position = () => {
    let position = document.getElementById("window_chat");
    console.log(position.scrollTop);
    console.log(position.scrollHeight);
    position.scrollTop = position.scrollHeight;
  };
  useEffect(() => {
    position();
  }, []);
  return (
    <div>
      <div
        className="flex flex-col home w-full px-0 lg:px-10  2xl-40 bg-bgColor 
    lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-32 h-full shrink-0">
          {/* {LEFT} */}
          <div className="h-full w-20 rounded-xl bg-primary overflow-hidden">
            <div className="w-full h-2/3 gap-7 flex flex-col items-center content-end justify-start py-10 ">
              <div className="hover:bg-ascent-3/30 py-1 px-1 rounded-xl">
                <IoIosChatbubbles className="text-ascent-1 " size={30} />
              </div>
              <div className="hover:bg-ascent-3/30 py-1 px-1 rounded-xl">
                <IoIosContact className="text-ascent-1 " size={30} />
              </div>
              <div className="hover:bg-ascent-3/30 py-1 px-1 rounded-xl">
                <FaVideo className="text-ascent-1 " size={30} />
              </div>

              {/* <IoIosSettings className=" text-ascent-1 " size={30} /> */}
            </div>

            <div className="h-1/3 w-full bg-primary flex justify-center items-end py-10">
              <div className="hover:bg-ascent-3/30 py-1 px-1 rounded-xl">
                <IoIosSettings className=" text-ascent-1 " size={30} />
              </div>
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
              {listmanager.map((user) => {
                return (
                  <UserCard
                    user={user}
                    event={() => {
                      onchangepage(user?.page);
                    }}
                  />
                );
              })}

              {/* <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} />
              <UserCard user={user} /> */}
            </div>
            {/* <FriendsCard friends={user?.friends} /> */}
          </div>
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg justify-between">
            {/* Phần tiêu đề của khung chat */}
            <div className="flex w-full justify-between mt-3 border-b border-[#66666645] pb-3 select-none ">
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
            <div id="window_chat" className="flex-1 h-3/4 overflow-auto">
              {/* Danh sách tin nhắn */}
              <div className="flex flex-col gap-2 h-full">
                <div ref={myDivRef} className="flex items-center w-full">
                  {/* <div className="bg-gray-300 rounded-full h-8 w-8 flex items-center justify-between text-ascent-2"></div> */}
                  {page == 1 && <Pagechat_1 />}
                  {page == 2 && <Pagechat_2 />}
                  {page == 3 && <Pagechat_3 />}
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
                        e.target.files[0] && handlebg(e);
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
