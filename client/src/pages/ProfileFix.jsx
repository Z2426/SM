import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, PostCard, TopBar } from "../components";
import { NoProfile } from "../assets";
import { useNavigate, useParams } from "react-router-dom";
import {
  checktoken,
  deletePost,
  fetchPosts,
  getUserInfo,
  likePost,
  viewUserProfile,
} from "../until";
import { CiLocationOn } from "react-icons/ci";
import { BsBriefcase, BsFacebook, BsInstagram } from "react-icons/bs";
import { FaTwitterSquare } from "react-icons/fa";
import moment from "moment";
const ProfileFix = () => {
  const { id } = useParams();
  const { user, edit } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const uri = "/posts/get-user-post/" + id;
  const [userInfor, setUserInfor] = useState(user);
  const handleDelete = async (id) => {
    await deletePost(id, user.token);
    await getPosts();
  };
  const handleLikePost = async (uri) => {
    await likePost({ uri: uri, token: user?.token });
    await getPosts();
  };
  const getPosts = async () => {
    await fetchPosts(user.token, dispatch, uri);
    setLoading(false);
  };
  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfor(res);
  };
  console.log(userInfor);

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
  }, [id]);

  return (
    <div className="home w-full  bg-bgColor text-ascent-1 overflow-hidden lg:rounded-lg h-screen items-center">
      <TopBar user={user} />
      <div className="w-full h-full flex justify-center overflow-auto">
        <div className="flex flex-col  h-screen w-8/12 items-center ">
          <div className="flex w-full h-1/4 bg-secondary relative ">
            <img
              src={user?.profileUrl ?? NoProfile}
              alt={user?.email}
              className="object-cover h-full w-full
              overflow-hidden rounded-xl"
            />
            {/* <div className="relative right-12 z-30">Edit</div> */}
          </div>

          <div className="text-ascent-1 w-full rounded-xl mb-5 py-7 text-center bg-primary pb-8  font-bold text-4xl border-b-2 border-[#66666645] flex flex-col items-center">
            <div>
              <img
                src={user?.profileUrl ?? NoProfile}
                alt={user?.email}
                className="object-cover h-52 w-52 
             rounded-full relative bottom-12 overflow-hidden outline outline-8 text-ascent-2"
              />
            </div>
            <div className="relative bottom-4">
              {user?.firstName} {user?.lastName}
            </div>
          </div>
          {/* <div className="flex overflow-auto"> */}
          <div className="w-full flex gap-6 ">
            <div className="w-2/3 h-full">
              <div className="w-full h-full bg-primary px-4 flex flex-col gap-6 overflow-y-auto rounded-xl  items-center  mb-36">
                {/* <div className="w-full mx-10">
                  <Loading />
                </div> */}

                {loading ? (
                  <div className="w-full  justify-center h-full flex">
                    <Loading />
                  </div>
                ) : posts?.length > 0 ? (
                  posts?.map((post) => (
                    <div className="w-full" key={post._id}>
                      <PostCard
                        // key={post._id}
                        post={post}
                        user={user}
                        deletePost={handleDelete}
                        likePost={handleLikePost}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex w-full h-full items-center justify-center">
                    <p className="text-lg text-ascent-2 ">No Post Available</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-ascent-1 rounded-xl bg-primary h-fit w-1/3 px-7">
              <div className="w-full h-fit ">
                <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
                  <div className="flex gap-2 items-center text-ascent-2">
                    <CiLocationOn className="text-xl text-ascent-1" />
                    <span>{user?.location ?? "Add Location"}</span>
                  </div>

                  <div className="flex gap-2 items-center text-ascent-2">
                    <BsBriefcase className="text-lg text-ascent-1" />
                    <span>{user?.profession ?? "Add Profession"}</span>
                  </div>
                  <div className="w-full flex flex-col gap-2 py-4 border-b border-[#66666645]">
                    <p className="text-xl text-ascent-1 font-semibold">
                      {user?.friends?.length} Friends
                    </p>
                    <div className="flex items-center justify-between w-full">
                      <span className="text-ascent-2">
                        Who viewed your profile
                      </span>
                      <span className="text-ascent-1 text-lg">
                        {user?.views?.length}
                      </span>
                    </div>

                    <span className="text-base text-blue">
                      {user?.verified ? "Verified Account" : " "}
                    </span>

                    <div className="flex items-center justify-between">
                      <span className="text-ascent-2">Joined</span>
                      <span className="text-ascent-1 text-base">
                        {moment(user?.createdAt).fromNow()}
                      </span>
                    </div>

                    <div className="w-full flex flex-col gap-4 py-4 pb-6">
                      <p className="text-ascent-1 text-lg font-semibold">
                        Social Profile
                      </p>
                      <div className="flex gap-2 items-center text-ascent-2">
                        <BsInstagram className="text-xl text-ascent-1" />
                        <span>Instagram</span>
                      </div>
                      <div className="flex gap-2 items-center text-ascent-2">
                        <FaTwitterSquare className="text-xl text-ascent-1" />
                        <span>Twitter</span>
                      </div>
                      <div className="flex gap-2 items-center text-ascent-2">
                        <BsFacebook className="text-xl text-ascent-1" />
                        <span>Facebook</span>
                      </div>
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

export default ProfileFix;