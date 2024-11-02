import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  EditProfile,
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import {
  checktoken,
  deletePost,
  fetchPosts,
  getUserInfo,
  likePost,
  viewUserProfile,
} from "../until";
import Cookies from "js-cookie";
// import { posts } from "../assets/data";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [userInfor, setUserInfor] = useState(user);
  const [loading, setLoading] = useState(false);
  const uri = "/posts/get-user-post/" + id;
  const navigate = useNavigate();
  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfor(res);
  };
  console.log(userInfor);
  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  };

  const test = async () => {
    console.log(user);
    const res = await checktoken({
      token: user?.token,
    });
    if (res?.status === "failed") {
      const message = res?.message?.message;
      console.log(res?.message);
      Cookies.set("message", message, { expires: 7 });
      navigate("/error");
    }
    console.log(res);
  };

  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await getPosts();
  };

  console.log(posts);

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
    test();
  }, [id]);
  return (
    <div>
      <div
        className="home w-full px-0 lg:px-10 pb-20 2xl-40 bg-bgColor 
    lg:rounded-lg h-screen overflow-hidden"
      >
        <TopBar user={user} />
        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          {/* {LEFT} */}
          <div
            className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6
        overflow-y-auto"
          >
            <ProfileCard user={userInfor} />
            <div className="block lg:hidden">
              <FriendsCard friends={userInfor?.friends} />
            </div>
          </div>
          {/* {CENTER} */}
          <div className="flex-1 h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-lg">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2 ">No Post Available</p>
              </div>
            )}
          </div>

          {/* {RIGHT} */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfor?.friends} />
          </div>
        </div>
      </div>
      {edit && <EditProfile />}
    </div>
  );
};

export default Profile;
