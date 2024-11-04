import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import moment from "moment";
import { BiComment, BiLike, BiSolidLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import TextInput from "./TextInput";
import Loading from "./Loading";
import { IoBookmark } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import CustomButton from "./CustomButton";
import { postComments } from "../assets/data";
import { apiRequest } from "../until";
import { SlOptions } from "react-icons/sl";
import { GoBookmarkSlashFill } from "react-icons/go";
import { useSelector } from "react-redux";
import Editpost from "./Editpost";

const getPostComments = async (id) => {
  try {
    const res = await apiRequest({
      url: "/posts/comments/" + id,
      method: "GET",
    });

    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

const CommentForm = ({ user, id, replyAt, getComments }) => {
  //console.log(user, id, replyAt, getComments);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    setErrMsg("");
    try {
      const URL = !replyAt
        ? "/posts/comment/" + id
        : "/posts/reply-comment/" + id;
      console.log(id);
      const newData = {
        comment: data?.comment,
        from: user?.firstName + " " + user?.lastName,
        replyAt: replyAt,
      };
      const res = await apiRequest({
        url: URL,
        data: newData,
        token: user?.token,
        method: "POST",
      });

      if (res?.status === "failed") {
        setErrMsg(res);
      } else {
        reset({
          comment: "",
        });
        setErrMsg("");
        await getComments();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full border-b border-[#66666645]"
    >
      <div className="w-full flex items-center gap-2 py-4">
        <img
          src={user?.profileUrl ?? NoProfile}
          alt="User Image"
          className="w-10 h-10 rounded-full object-cover"
        />

        <TextInput
          name="comment"
          styles="w-full rounded-full py-3"
          placeholder={replyAt ? `Reply @${replyAt}` : "Comment this post"}
          register={register("comment", {
            required: "Comment can't be empty",
          })}
          error={errors.comment ? errors.comment.message : ""}
        />
      </div>
      {errMsg?.message && (
        <span
          role="alert"
          className={`text-sm ${
            errMsg?.status === "failed"
              ? "text-[#f64949fe]"
              : "text-[#2ba150fe]"
          } mt-0.5`}
        >
          {errMsg?.message}
        </span>
      )}

      <div className="flex items-end justify-end pb-2">
        {loading ? (
          <Loading />
        ) : (
          <CustomButton
            tittle={"Submit"}
            type="submit"
            containerStyles="bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm"
          />
        )}
      </div>
    </form>
  );
};

const ReplyCard = ({ reply, user, handleLike }) => {
  console.log(reply);
  return (
    <div className="w-full py-3">
      <div className="flex gap-3 items-center mb-1">
        <Link to={"/profile/" + reply?.userId?._id}>
          <img
            src={reply?.userId?.profileUrl ?? NoProfile}
            alt={reply?.userId?.firstName}
            className="w-10 h-10 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link to={"/profile/" + reply?.userId?._id}>
            <p className="font-medium text-base text-ascent-1">
              {reply?.userId?.firstName} {reply?.userId?.lastName}
            </p>
          </Link>
          <span className="text-ascent-2 text-sm">
            {moment(reply?.createAt).fromNow()}
          </span>
        </div>
      </div>
      <div className="ml-12">
        <p className="text-ascent-2">{reply?.comment}</p>
        <div className="mt-2 flex gap-6">
          <p
            className="flex gap-2 items-center text-base text-ascent-2
          cursor-pointer"
            onClick={handleLike}
          >
            {reply?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {reply?.likes?.length} Likes
          </p>
        </div>
      </div>
    </div>
  );
};

const Opt = ({ post, onClick, report }) => {
  const { user } = useSelector((state) => state.user);
  const [save, setSave] = useState(false);
  console.log(post?.userId?._id);
  console.log(user?._id);
  const handlereport = report;
  return (
    <div className="w-fit bg-bgColor">
      <span
        onClick={() => {
          setSave(!save);
        }}
        className=" flex  bg-primary justify-start items-center px-3 py-4 gap-2 hover:bg-ascent-3/30"
      >
        {save ? (
          <div className="text-ascent-1 flex justify-start items-center w-full gap-2">
            <GoBookmarkSlashFill />
            <div className="text-ascent-1 flex flex-col">
              <span>Save</span>
              <span className="text-xs text-ascent-2">
                Add this to your saveed items.
              </span>
            </div>
          </div>
        ) : (
          <div className="text-ascent-1 flex justify-start items-center w-full gap-2">
            <IoBookmark />

            <div className="text-ascent-1 flex flex-col">
              <span>Unsave</span>
              <span className="text-xs text-ascent-2">
                Remove this form your saved item.
              </span>
            </div>
          </div>
        )}
      </span>
      {post?.userId?._id == user?._id && (
        <span
          onClick={onClick}
          className="text-ascent-1 flex  bg-primary justify-start items-center px-3 py-4 gap-2 hover:bg-ascent-3/30"
        >
          <MdEdit />
          Edit
        </span>
      )}
      <div>
        <span
          onClick={handlereport}
          className="text-ascent-1 flex  bg-primary justify-start items-center px-3 py-4 gap-2 hover:bg-ascent-3/30"
        >
          <MdEdit />
          <div className="text-ascent-1 flex flex-col">
            <span>Report</span>
            <span className="text-xs text-ascent-2">
              We won't let {post?.userId?.lastName} know who reported this.
            </span>
          </div>
        </span>
      </div>
    </div>
  );
};

const PostCard = ({ post, user, deletePost, likePost }) => {
  const [showAll, setShowAll] = useState(0);
  const [showReply, setshowReply] = useState(0);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [option, setOption] = useState(false);
  const [replyComments, setReplyComments] = useState(0);
  const [showComments, setShowComments] = useState(0);
  const [editp, setEditp] = useState(false);
  const [editpost, setEditpost] = useState();
  console.log(post);
  const getComments = async (id) => {
    setReplyComments(0);
    const result = await getPostComments(id);
    setComments(result);
    setLoading(false);
  };
  const handleLike = async (uri) => {
    await likePost(uri);
    await getComments(post?._id);
  };
  const report = () => {
    setOption(!option);
  };
  // const fetchPost = async () => {
  //   try {
  //     await fetchPosts(user?.token, dispatch);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="mb-2 bg-primary p-4 rounded-xl">
        <div className="flex gap-3 items-center mb-2">
          <Link to={"/profilefix/" + post?.userId?._id}>
            <img
              src={post?.userId.profileUrl ?? NoProfile}
              alt={post?.userId.firstName}
              className="w-12 h-12 md:w-14 md:h-14 object-cover rounded-full"
            />
          </Link>

          <div className="relative w-full flex justify-between select-none">
            <div className="">
              <Link to={"/profilefix/" + post?.userId._id}>
                <p className="font-medium text-lg text-ascent-1">
                  {post?.userId?.firstName} {post?.userId?.lastName}
                </p>
              </Link>
              <span className="text-ascent-2">{post?.userId?.location}</span>
              {/* <span className="md:hidden flex text-ascent-2">
              {moment(post?.createdAt ?? "2023-05-25").fromNow()}
            </span> */}
              <span className="hidden md:flex text-ascent-2">
                {moment(post?.createdAt ?? "2023-05-25").fromNow()}
              </span>
            </div>
            {/* <span className="hidden md:flex text-ascent-2">
            {moment(post?.createdAt ?? "2023-05-25").fromNow()}
          </span> */}
            <div
              className="text-ascent-1 h-fit px-2 py-1 rounded-lg hover:bg-ascent-3/30"
              onClick={() => {
                setOption(!option);
              }}
              report={report}
            >
              <SlOptions size={20} />
            </div>
            {option && (
              <div className="absolute right-0 top-10 rounded-2xl overflow-hidden border border-[#66666645] shadow-xl">
                <Opt
                  post={post}
                  onClick={() => {
                    setEditp(!editp);
                  }}
                  report={report}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <Link to={"/post/" + post?._id}>
            <p className="text-ascent-2">
              {showAll === post?._id
                ? post?.description
                : post?.description.slice(0, 300)}
              {post?.description?.length > 301 &&
                (showAll === post?._id ? (
                  <span
                    className="text-blue ml-2 font-medium curson-pointer"
                    onClick={() => setShowAll(0)}
                  >
                    Show Less
                  </span>
                ) : (
                  <span
                    className="text-blue ml-2 font-medium curson-pointer"
                    onClick={() => setShowAll(post?._id)}
                  >
                    Show More
                  </span>
                ))}
            </p>
          </Link>

          {post?.image && (
            <div className="h-full flex justify-center items-center">
              <img
                src={post?.image}
                alt="post image"
                className="max-h-96 mt-2 rounded-lg "
              ></img>
            </div>
          )}
        </div>

        <div
          className="mt-4 flex justify-between items-center px-3 py-2 
      text-ascent-2 text-base border-t border-[#66666645]"
        >
          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => handleLike("/posts/like/" + post?._id)}
          >
            {post?.likes?.includes(user?._id) ? (
              <BiSolidLike size={20} color="blue" />
            ) : (
              <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
          </p>

          <p
            className="flex gap-2 items-center text-base cursor-pointer"
            onClick={() => {
              setShowComments(showComments === post._id ? null : post._id);
              getComments(post?._id);
            }}
          >
            <BiComment size={20} />
            {post?.comments?.length} Comments
          </p>
          {user?._id === post?.userId?._id && (
            <div
              className="flex gap-1 items-center text-base cursor-pointer"
              onClick={() => deletePost(post?._id)}
            >
              <MdOutlineDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          )}
        </div>

        {/* {COMMENT} */}

        {showComments === post?._id && (
          <div className="w-full mt-4 border-t border-[#66666645] pt-4">
            <CommentForm
              user={user}
              id={post?._id}
              getComments={() => getComments(post?._id)}
            />
            {loading ? (
              <Loading />
            ) : comments?.length > 0 ? (
              comments?.map((comment) => (
                <div className="w-full py-2" key={comment?._id}>
                  <div className="flex gap-3 items-center mb-1">
                    <Link to={"/profile/" + comment?.userId?._id}>
                      <img
                        src={comment?.userId?.profileUrl ?? NoProfile}
                        alt={comment?.userId?.firstName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link to={"/profile/" + comment?.userId?._id}>
                        <p className="font-medium text-base text-ascent-1">
                          {comment?.userId?.firstName}{" "}
                          {comment?.userId?.lastName}
                        </p>
                      </Link>
                      <span className="text-ascent-2 text-sm">
                        {moment(comment?.createAt ?? "2023-05-25").fromNow()}
                      </span>
                    </div>
                  </div>

                  <div className="ml-12">
                    <p className="text-ascent-2">{comment?.comment}</p>
                    <div className="mt-2 flex gap-6">
                      <p
                        className="flex gap-2 items-center text-base
                    text-ascent-2 cursor-pointer"
                        onClick={() =>
                          handleLike("/posts/like-comment/" + comment?._id)
                        }
                      >
                        {" "}
                        {comment?.likes?.includes(user?._id) ? (
                          <BiSolidLike size={20} color="blue" />
                        ) : (
                          <BiLike size={20} />
                        )}
                        {comment?.likes?.length} Likes
                      </p>
                      <span
                        onClick={() => setReplyComments(comment?._id)}
                        className="text-blue cursor-pointer"
                      >
                        Reply
                      </span>
                    </div>

                    {replyComments === comment?._id && (
                      <CommentForm
                        user={user}
                        id={comment?._id}
                        replyAt={comment?.from}
                        getComments={() => getComments(post?._id)}
                      />
                    )}
                  </div>

                  {/* {REPLIES} */}
                  <div className="py-2 px-8 mt-6">
                    {comment?.replies?.length > 0 && (
                      <p
                        className="text-base text-ascent-1 cursor-pointer"
                        onClick={() =>
                          setshowReply(
                            showReply === comment?.replies?._id
                              ? 0
                              : comment?.replies?._id
                          )
                        }
                      >
                        Show Replies ({comment?.replies?.length})
                      </p>
                    )}
                    {showReply === comment?.replies?._id &&
                      comment?.replies?.map((reply) => (
                        <ReplyCard
                          reply={reply}
                          user={user}
                          key={reply?._id}
                          handleLike={() =>
                            handleLike(
                              "/posts/like-comment/" +
                                comment?._id +
                                "/" +
                                reply?._id
                            )
                          }
                        />
                      ))}
                  </div>
                </div>
              ))
            ) : (
              <span className="flex text-sm py-4 text-ascent-2 text-center">
                No comments, be first to comment
              </span>
            )}
          </div>
        )}
      </div>
      {/* {editp && <Editpost onClick={()=>{setEditp(!editp)} }/>} */}

      {editp && (
        <Editpost
          post={post}
          onClick={() => {
            setEditp(!editp);
          }}
        />
      )}
    </div>
  );
};

export default PostCard;
