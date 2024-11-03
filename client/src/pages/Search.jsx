import React, { useEffect, useState } from "react";
import { FriendCard, FriendMain, TopBar } from "../components";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import { NoProfile } from "../assets";
import { useSelector } from "react-redux";
import { FaUserFriends } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { MdFeed } from "react-icons/md";
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
import { Loading, PostCard } from "../components/index";
import { useDispatch } from "react-redux";
const Search = () => {
  const { keyword } = useParams();
  const [key, setKey] = useState();
  const [right, setRight] = useState(false);
  const [left, setLeft] = useState(true);
  console.log("main key:" + keyword);

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const crollright = () => {
    let position = document.getElementById("request");
    position.scrollLeft += 200;
  };
  const crollleft = () => {
    let position = document.getElementById("request");
    position.scrollLeft -= 200;
  };
  const handleSearch = async (data) => {
    try {
      await fetchPosts(user.token, dispatch, "", data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPost = async () => {
    try {
      await fetchPosts(user?.token, dispatch);
      setLoading(false);
      console.log(posts);
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
  useEffect(() => {
    // setLoading(true);
    // handleSearch(key);
    // fetchPost();
  }, []);

  return (
    <div>
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} setKey={setKey} />
        <div className="w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full justify-between">
          <div className="w-1/5 h-full md:flex flex-col gap-2 overflow-y-auto flex-initial bg-primary rounded-lg px-7">
            <span className="text-ascent-1 text-2xl font-bold w-full  pt-5 border-b border-[#66666645]">
              Search
            </span>
            <span className="text-base font-medium text-ascent-1 w-full ">
              Filters
            </span>
            <div className="bg-primary w-full h-fit rounded-lg flex flex-col gap-3 overflow-hidden">
              <Link
                className="flex gap-2 hover:bg-ascent-3/30 w-full rounded-xl py-2"
                onClick={() => {
                  fetchPost();
                }}
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <MdFeed size={30} />
                  </div>
                  All
                </span>
              </Link>

              <Link
                to={"/frienddetails"}
                className="flex gap-2 hover:bg-ascent-3/30 w-full py-2 rounded-xl"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center  ">
                    <MdFavorite size={30} />
                  </div>
                  Favorites
                </span>
              </Link>
              <Link
                to={"/friendsuggest"}
                className="flex gap-2 hover:bg-ascent-3/30 w-full rounded-xl py-2"
              >
                <span className="text-base font-medium text-ascent-1 flex items-center gap-2">
                  <div className="w-10 h-10 flex items-center justify-center  ">
                    <FaUserFriends size={30} />
                  </div>
                  People
                </span>
              </Link>
            </div>
          </div>
          <div className=" justify-center h-full flex-initial w-4/5 flex-wrap px-4 py-4 flex gap-6 overflow-y-auto rounded-lg">
            <div>
              <div className="w-full h-fit flex flex-wrap gap-2 select-none">
                {/* <span className="text-ascent-1 font-bold text-3xl">
                  People you may know
                </span> */}
                <div className="flex justify-center items-center flex-col">
                  <div className="w-full h-fit flex gap-2 flex-wrap justify-center">
                    {/* {(() => {
                      const items = [];
                      for (let i = 0; i < 20; i++) {
                        items.push(
                          <div className="w-44 h-fit">
                            <FriendCard />
                          </div>
                        );
                      }
                      return items;
                    })()} */}
                    {/* <div className=" w-2/3 h-20 flex flex-col"></div> */}
                    <div className=" w-full h-fit flex flex-col">
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
                          <p className="text-lg text-ascent-2">
                            No Post Available
                          </p>
                        </div>
                      )}
                    </div>
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

export default Search;
