import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Cookies from "js-cookie";
import { FaUserFriends } from "react-icons/fa";
import { IoBookmark } from "react-icons/io5";
import {
  CustomButton,
  EditProfile,
  EditFix,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TextInput,
  TopBar,
  Notification,
  Post,
  ChatCard,
  ImageCheck,
  Editpost,
} from "../components";
import Profile from "./Profile";
// import { requests, suggest } from "../assets/data";
import { Link, redirect, useNavigate } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonFillAdd, BsFiletypeGif } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { BiImages, BiSolidVideo } from "react-icons/bi";
import {
  apiRequest,
  checktoken,
  deletePost,
  fetchNotifications,
  fetchPosts,
  getUserInfo,
  handFileUpload,
  likePost,
  sendFriendRequest,
  uploadVideo,
} from "../until";
import { dispatch } from "../redux/store";
import { Logout, UpdatePost } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { UserLogin } from "../redux/userSlice";
const Home = () => {
  const { posts } = useSelector((state) => state.posts);
  const { user, edit, notification, post } = useSelector((state) => state.user);
  const [friendRequest, setfriendRequest] = useState();
  const [notifications, setNotifications] = useState();
  const [suggestedFriends, setsuggestedFriends] = useState();
  const [errMsg, seterrMsg] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [search, setSearch] = useState("");
  const [posting, setPosting] = useState(false);
  const [picreview, setPicreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setPreview(false);
    seterrMsg("");

    try {
      // if (file.type === "video/mp4") {
      //   console.log(file);
      //   const uri = file && (await uploadVideo(file));
      // } else {
      //   console.log(file);
      //   const uri = file && (await handFileUpload(file));
      // }
      const uri = file && (await handFileUpload(file));

      const newData = uri ? { ...data, image: uri } : data;
      const res = await apiRequest({
        url: "/posts/create-post",
        data: newData,
        token: user?.token,
        method: "POST",
      });
      if (res?.status === "failed") {
        seterrMsg(res);
      } else {
        reset({
          description: "",
        });
        setFile(null);
        seterrMsg("");
        await fetchPost();
      }
      setPosting(false);
      setFile(null);
      setPreview(false);
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  // const handlePreview = async (file) => {
  //   if (file) {
  //     console.log(file);
  //     await setFile(file);
  //     setPreview(true);
  //   }
  // };

  //console.log(user);

  const fetchPost = async () => {
    try {
      await fetchPosts(user?.token, dispatch);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await fetchPost();
  };
  const handleDeletePost = async (id) => {
    await deletePost(id, user?.token);
    await fetchPost();
  };
  const fetchNotification = async () => {
    try {
      const res = await fetchNotifications({
        token: user?.token,
        userId: user?._id,
        dispatch,
      });
      console.log(res);
      setNotifications(res.notifications);
    } catch (error) {
      console.log(error);
    }
  };
  const test = async () => {
    //console.log(user);
    const res = await checktoken({
      token: user?.token,
    });
    if (res?.status === "failed") {
      const message = res?.message?.message;
      console.log(res?.message);
      Cookies.set("message", message, { expires: 7 });
      dispatch(Logout());
      navigate("/login");
      // navigate("/error");
    }
    //console.log(res);
  };
  const fetchFriendRequest = async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "POST",
      });
      //console.log(res);
      if (res?.status === "failed") {
        Cookies.set("message", res?.message, { expires: 7 });
        navigate("/error");
      }
      setfriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSuggestFriends = async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: user?.token,
        method: "POST",
      });
      if (res?.status === "failed") {
        Cookies.set("message", res?.message, { expires: 7 });
        navigate("/error");
      }
      //console.log(res);
      setsuggestedFriends(res);
    } catch (error) {
      //console.log(error);
    }
  };
  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user.token, id);
      await fetchSuggestFriends();
      if (res?.status === "failed") {
        Cookies.set("message", res?.message, { expires: 7 });
        navigate("/error");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptFriendRequest = async (id, status) => {
    try {
      const res = apiRequest({
        url: "/users/accept-request",
        token: user?.token,
        method: "POST",
        data: { rid: id, status },
      });
      setfriendRequest(res?.data);
      if (res?.status === "failed") {
        Cookies.set("message", res?.message, { expires: 7 });
        navigate("/error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    //console.log(user?.token);
    try {
      const res = await getUserInfo(user?.token);
      const newData = { token: user?.token, ...res };

      dispatch(UserLogin(newData));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      fetchSuggestFriends();
    } else {
      try {
        console.log(`/users/search/${search}`);
        const res = await apiRequest({
          url: `/users/search/${search}`,
          token: user?.token,
          data: {},
          method: "POST",
        });
        console.log(res);
        setsuggestedFriends(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    test();
    getUser();
    fetchPost();
    fetchFriendRequest();
    fetchNotification();
    fetchSuggestFriends();
  }, []);
  return (
    <div>
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
    lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} />

        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full justify-between">
          {/* {LEFT} */}
          <div className="hidden w-1/5 h-full md:flex flex-col gap-6 overflow-y-auto flex-initial">
            {/* <ProfileCard user={user} /> */}
            <div className="bg-primary w-full h-fit rounded-lg flex flex-col gap-3 overflow-hidden">
              <Link
                to={"/profilefix/" + user?._id}
                className="flex gap-2 hover:bg-ascent-3/30 w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <img
                      src={user?.profileUrl ?? NoProfile}
                      alt={user?.email}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </div>
                  {user?.firstName} {user?.lastName}
                </span>
              </Link>
              <Link
                to={"/friend"}
                className="flex gap-2 hover:bg-ascent-3/30 w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <FaUserFriends size={30} />
                  </div>
                  Friends
                </span>
              </Link>

              <Link
                to={"/save"}
                className="flex gap-2 hover:bg-ascent-3/30 w-full px-6 py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center  ">
                    <IoBookmark size={30} />
                  </div>
                  Saved
                </span>
              </Link>
            </div>
            <FriendsCard friends={user?.friends} />
          </div>
          {/* {CENTTER} */}
          <div className="no-scrollbar h-full flex-initial w-2/5 bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg ">
            <form
              onSubmit={handleSubmit(handlePostSubmit)}
              className="bg-primary px-4 rounded-lg"
            >
              <div className="w-full flex items-center gap-2 py-4 border-b border-[#66666645]">
                <img
                  src={user?.profileUrl ?? NoProfile}
                  alt="User Image"
                  className="w-14 h-14 rounded-full object-cover"
                />

                {/* <TextInput
                  styles="w-full rounded-full py-5"
                  placeholder="What's on your mind...."
                  name="description"
                  register={register("description", {
                    required: "Write something about post",
                  })}
                  error={errors.description ? errors.description.message : ""}
                /> */}
                <div
                  className=" text-ascent-2 rounded-full border border-[#66666645] py-5 w-full bg-secondary hover:cursor-text"
                  onClick={() => {
                    // console.log("!solem");
                    dispatch(UpdatePost(true));
                  }}
                >
                  <div className="px-8">What's on your mind....</div>
                </div>
              </div>

              {/* {preview && (
                <>
                  <span className="text-ascent-1">Preview Image</span>
                  <img
                    className="w-full mt-2 rounded-lg"
                    src={`${URL.createObjectURL(file)} `}
                    onClick={() => {
                      {
                        setPreview(false);
                        setFile(null);
                      }
                    }}
                  />
                </>
              )}
               */}
              {/* {"After"} */}

              {preview && (
                <>
                  {/* <span
                    className="text-ascent-1 cursor-pointer rounded-full px-4 py-1 bg-[#0444a4]"
                    onClick={() => {
                      setPreview(false);
                      setFile(null);
                    }}
                  >
                    Close
                  </span> */}
                  {/* <span className="text-ascent-1">
                    Preview {file.type.includes("image") ? "Image" : "Video"}
                  </span> */}
                  {/* {file.type.includes("image") ? (
                    <img
                      className="w-full mt-2 rounded-lg"
                      src={`${URL.createObjectURL(file)}`}
                    />
                  ) : (
                    <video
                      ref={videoRef}
                      controls
                      className="w-full mt-2 rounded-lg"
                    >
                      <source
                        src={`${URL.createObjectURL(file)}`}
                        type={file.type}
                      />
                      Your browser does not support the video tag.
                    </video>
                  )} */}
                </>
              )}

              {/* {file != null && <img src="" />}
              {errMsg?.message && (
                <span
                  role="alert"
                  className={`text-sm ${
                    errMsg?.status === "failed"
                      ? "text-[#f64949fe]"
                      : "text-[#2bá50fe]"
                  } mt-0.5`}
                >
                  {errMsg?.message}
                </span>
              )} */}

              {
                <div className="flex items-center justify-between py-4">
                  <label
                    htmlFor="imgUpload"
                    className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  >
                    {/* <input
                    type="file"
                    onChange={(e) => handlePreview(e.target.files[0])}
                    className="hidden"
                    id="imgUpload"
                    data-max-size="5120"
                    accept=".jpg, .png, .jpeg"
                  /> */}
                    {/* <BiImages />
                  <span>Image</span> */}
                  </label>

                  {/* <label
                  htmlFor="videoUpload"
                  className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                >
                  <input
                    type="file"
                    onChange={(e) => handlePreview(e.target.files[0])}
                    className="hidden"
                    id="videoUpload"
                    data-max-size="5120"
                    accept=".mp4, .wav"
                  />
                  <BiSolidVideo />
                  <span>Video</span>
                </label> */}

                  <label
                    htmlFor="vgifUpload"
                    className="flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer"
                  >
                    {/* <input
                    type="file"
                    onChange={(e) => handlePreview(e.target.files[0])}
                    className="hidden"
                    id="vgifUpload"
                    data-max-size="5120"
                    accept=".gif"
                  /> */}
                    {/* <BsFiletypeGif />
                  <span>Gif</span> */}
                  </label>

                  {/* <div>
                  {posting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      tittle="Post"
                      containerStyles="bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm"
                    />
                  )}
                </div> */}
                </div>
              }
            </form>

            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  deletePost={handleDeletePost}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>
          {/* {RIGHT} */}
          <div className="hidden w-1/5 h-full lg:flex flex-col gap-8 overflow-y-auto flex-initial">
            {/* {FRIEND REQUEST} */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
              <div
                className="flex items-center justify-between text-xl text-ascent-1 
            pb-2 border-b border-[#66666645f]"
              >
                <span>Friend Request</span>
                <span>{friendRequest?.length}</span>
              </div>

              <div className="w-full flex flex-col gap-4 pt-4">
                {friendRequest?.map(({ _id, requestFrom: from }) => (
                  <div key={_id} className="flex items-center justify-between">
                    <Link
                      to={"/profilefix/" + from._id}
                      className="w-full flex gap-4 items-center 
                          cursor-pointer "
                    >
                      <img
                        src={from?.profileUrl ?? NoProfile}
                        alt={from?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {from?.firstName} {from?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {from?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>
                    <div className="flex gap-1">
                      <CustomButton
                        tittle="Accept"
                        onClick={() => acceptFriendRequest(_id, "Accepted")}
                        containerStyles="bg-[#0444a4] text-xs text-white px-1.5
                    py-1 rounded-full"
                      />
                      <CustomButton
                        tittle="Deny"
                        onClick={() => acceptFriendRequest(_id, "Denied")}
                        containerStyles="border border-[#666] text-xs
                    text-ascent-1 px-1.5 py-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* {SUGGEST FRIENDS} */}
            <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
              <div className="flex items-center justify-between text-lg text-ascent-1 ">
                <span>Friend Suggestion</span>
              </div>
              <form
                className="hidden md:flex items-center justify-center gap-5"
                onSubmit={(e) => handleSearch(e)}
              >
                {/* <TextInput
                      styles="w-full rounded-l-full py-5"
                      placeholder="What's on your mind...."
                      register={register("search")}
                    /> */}
                <input
                  className="bg-primary placeholder:text-[#666] pl-1 border-[#66666690] border-b w-full 
                      outline-none text-ascent-2"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {/* <CustomButton
                      tittle="search"
                      type="submit"
                      containerStyles="bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
                    /> */}

                <button
                  onClick={() => {}}
                  type={"submit"}
                  className={`inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full`}
                >
                  search
                </button>
              </form>

              <div className="w-full flex flex-col gap-4 pt-4">
                {suggestedFriends?.map((friend) => (
                  <div
                    className="flex items-center justify-between"
                    key={friend._id}
                  >
                    <Link
                      to={"/profilefix/" + friend?._id}
                      key={friend._id}
                      className="w-full flex gap-4 items-center 
                  cursor-pointer"
                    >
                      <img
                        src={friend?.profileUrl ?? NoProfile}
                        alt={friend?.firstName}
                        className="w-10 h-10 object-cover rounded-full"
                      />

                      <div className="flex-1">
                        <p className="text-base font-medium text-ascent-1">
                          {friend?.firstName} {friend?.lastName}
                        </p>
                        <span className="text-sm text-ascent-2">
                          {friend?.profession ?? "No Profession"}
                        </span>
                      </div>
                    </Link>

                    <div className="flex gap-1">
                      <button
                        className="bg-[#0444a430] text-sm text-white p-1 rounded"
                        onClick={() => handleFriendRequest(friend?._id)}
                      >
                        <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* <div className="absolute w-1/3 h-2/5 bg-transparent bottom-10 right-10">
            <ChatCard />
          </div> */}
        </div>
      </div>

      {edit && <EditFix />}
      {post && <Post onEvent={fetchPost} />}

      {/* {picreview && <ImageCheck />} */}
    </div>
  );
};

export default Home;
