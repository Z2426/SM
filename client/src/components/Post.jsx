import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDown } from "react-icons/ai";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdatePost, UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handFileUpload } from "../until";
import { FaEarthAfrica } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { CiImageOn, CiShoppingTag } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import { NoProfile } from "../assets";
import ListCard from "./ListCard";
const Post = ({ onEvent }) => {
  const { user, post } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, seterrMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [picture, setPicuter] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(false);
  const [write, setWrite] = useState(true);
  const [audience, setAudience] = useState(false);
  const [specific, setSpecific] = useState(false);
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
  const [review, setReview] = useState();
  const [tem, setTem] = useState();
  const [lists, setLists] = useState([]);
  const [option, setOption] = useState("public");

  const handlebg = (e) => {
    // console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      setReview(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setPreview(true);
  };
  const pushList = (id) => {
    let memo = [...lists];
    console.log(memo);

    lists.includes(id)
      ? (memo = lists.filter((memo) => memo != id))
      : memo.push(id);

    setLists(memo);

    console.log(memo);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handlePreview = async (file) => {
    if (file) {
      console.log(file);
      await setFile(file);
      setPreview(true);
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   mode: "onChange",
  //   defaultValues: { ...user },
  // });

  const onSubmit = async (data) => {
    setisSubmitting(true);
    seterrMsg("");
    try {
      const uri = picture && (await handFileUpload(picture));
      const { firstName, lastName, location, profession } = data;

      const res = await apiRequest({
        url: "/users/update-user",
        data: {
          firstName,
          lastName,
          location,
          profileUrl: uri ? uri : user?.profileUrl,
          profession,
        },
        method: "PUT",
        token: user?.token,
      });

      console.log(res);
      if (res?.status === "failed") {
        seterrMsg(res);
      } else {
        seterrMsg(res);

        const newUser = { token: res?.token, ...res?.user };

        dispatch(UserLogin(newUser));

        setTimeout(() => {
          dispatch(UpdateProfile(false));
        }, 3000);
      }
      setisSubmitting(false);
    } catch (error) {
      console.log(error);
      setisSubmitting(false);
    }
  };
  const handleCheck = (id, check) => {
    console.log(check);

    lists.includes(id) ? (check = true) : (check = false);
  };
  const handlePostSubmit = async (data) => {
    setPosting(true);
    setPreview(false);
    seterrMsg("");
    data.visibility = option;
    // console.log(data);

    try {
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
        await onEvent();
      }
      setPosting(false);
      setFile(null);
      setPreview(false);
      handleClose();
    } catch (error) {
      console.log(error);
      setPosting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdatePost(false));
  };
  //delete
  const handleSelect = (e) => {
    setPicuter(e.target.files[0]);
  };

  return (
    <div>
      <div className="fixed z-50 inset-0 overflow-y-auto">
        <div
          className="flex items-center justify-center min-h-screen pt-4
            px-4 pb-20 text-center sm:block sm:p-0"
        >
          <div className="fixed inset-0 transition-opacticy">
            <div className="absolute inset-0 bg-[#000] opacity-70"></div>
          </div>
          <span className="h-full w-full flex justify-center items-center sm:inline-block sm:align-middle sm:h-screen  select-none">
            <form onSubmit={handleSubmit(handlePostSubmit)}>
              <div
                className="inline-block align-bottom bg-primary rounded-3xl
            text-left overflow-hidden shadow-xl transform transition-all
            sm:my-10 sm:align-middle sm:max-w-md sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="flex justify-between px-6 pt-5 pb-2">
                  <label
                    htmlFor="name"
                    className="block w-full  text-xl text-ascent-1 text-center font-bold"
                  >
                    Create Post
                  </label>

                  <button className="text-ascent-1" onClick={handleClose}>
                    <MdClose size={22} />
                  </button>
                </div>
                <div className="flex flex-col relative">
                  {write && (
                    <div className="w-full h-full">
                      <div className="flex justify-center items-center ">
                        <div
                          className="bg-secondary text-ascent-1 px-2 py-1 opacity-70 flex justify-center items-center gap-1"
                          onClick={() => {
                            setAudience(true);
                            // setWrite(false);
                          }}
                        >
                          <FaEarthAfrica />
                          {option} <AiOutlineDown size={15} />
                        </div>
                      </div>
                      <div className="flex justify-between px-6 pt-5 pb-2">
                        <label
                          htmlFor="name"
                          className="block font-medium text-xl text-ascent-1 text-left py-7 box-border"
                        ></label>
                        <div className="w-full h-full flex-col-reverse m-3 gap-80">
                          <textarea
                            {...register("description", {
                              required: "Write something about post",
                            })}
                            error={
                              errors.description
                                ? errors.description.message
                                : ""
                            }
                            className="w-full h-72 bg-primary rounded-3xl border-none
            outline-none text-xl text-ascent-1 
            px-4 py-3 placeholder:text-ascent-2 placeholder:text-3xl resize-none"
                            value={content}
                            placeholder="Write something about post"
                            onChange={(ev) => {
                              setContent(ev.target.value);
                            }}
                          />
                          {preview && (
                            <div className="py-4 w-full flex justify-center gap-3 ">
                              <div
                                className="flex relative w-full  rounded-xl overflow-hidden"
                                onClick={() => {}}
                              >
                                <img src={review} alt="Something wrong" />
                                <div
                                  onClick={() => {
                                    setPreview(false);
                                    setFile(null);
                                  }}
                                  className="rotate-45 cursor-pointer absolute right-1 top-1 bg-[#000000] aspect-square rounded-full opacity-90 w-6 h-6 text-white flex justify-center items-center"
                                >
                                  <AiOutlinePlus />
                                </div>
                              </div>
                            </div>
                          )}
                          {!posting && (
                            <div className="flex gap-3">
                              <div className="w-fit py-1 flex outline-1 px-3 text-[#04c922] bg-primary rounded-full outline  justify-center items-center cursor-pointer ">
                                <CiShoppingTag />
                                <div className="hover:text-ascent-1">Tags</div>
                              </div>

                              <div className="w-fit py-1 flex outline-1 px-3 text-[#345cd9] bg-primary rounded-full outline  justify-center items-center cursor-pointer">
                                <label
                                  htmlFor="imgUpload"
                                  className="flex items-center gap-1 text-base text-[#345cd9] hover:text-ascent-1 cursor-pointer"
                                >
                                  <input
                                    type="file"
                                    onChange={(e) => {
                                      e.target.files[0] && handlebg(e);
                                    }}
                                    className="hidden"
                                    id="imgUpload"
                                    data-max-size="5120"
                                    accept=".jpg, .png, .jpeg"
                                  />
                                  <CiImageOn />
                                  Image
                                </label>
                              </div>
                            </div>
                          )}

                          <div className="w-full flex justify-end">
                            {posting ? (
                              <div className="w-full flex justify-center items-center mx-2">
                                <Loading />
                              </div>
                            ) : (
                              <CustomButton
                                type="submit"
                                Post
                                onClick={() => {
                                  console.log("press");
                                }}
                                containerStyles={`inline-flex justify-center rounded-full bg-blue px-8
                    py-3 text-sm font-medium text-white outline-none`}
                                tittle="Post"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {audience && (
                    <div className="bg-primary absolute w-full h-full flex flex-col justify-between">
                      <div className="flex w-full h-full select-none overflow-y-auto my-5">
                        <div
                          className="w-full h-72 mb-20 rounded-3xl border-none
            outline-none text-xl text-ascent-1 px-5 py-3 placeholder:text-ascent-2 "
                        >
                          <label
                            htmlFor="default-radio-1"
                            className="items-center mb-4 select-none w-full bg-primary flex px-5 py-2 justify-between hover:bg-ascent-3/30 rounded-xl"
                          >
                            <label
                              htmlFor="default-radio-1"
                              className="ms-2 text-gray-900 dark:text-gray-300 font-medium"
                            >
                              Public
                              <br />
                              <span className="text-ascent-2 text-base">
                                Anyone can see
                              </span>
                            </label>
                            <input
                              id="default-radio-1"
                              type="radio"
                              value="public"
                              name="auth"
                              onChange={(e) => {
                                setOption(e.target.value);
                              }}
                              className="w-5 h-5 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
                            />
                          </label>
                          <label
                            htmlFor="default-radio-2"
                            className="items-center mb-4 select-none w-full bg-primary flex px-5 py-2 justify-between hover:bg-ascent-3/30 rounded-xl"
                          >
                            <label
                              htmlFor="default-radio-2"
                              className="ms-2 text-gray-900 dark:text-gray-300 font-medium"
                            >
                              Specific friends
                              <br />
                              <span className="text-ascent-2 text-base">
                                Only show to some friends
                              </span>
                            </label>
                            <input
                              id="default-radio-2"
                              type="radio"
                              value="specific"
                              name="auth"
                              onChange={(e) => {
                                setOption(e.target.value);
                                setSpecific(!specific);
                              }}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </label>
                          <label
                            htmlFor="default-radio-3"
                            className="items-center mb-4 select-none w-full bg-primary flex px-5 py-2 justify-between hover:bg-ascent-3/30 rounded-xl"
                          >
                            <label
                              htmlFor="default-radio-3"
                              className="ms-2 text-gray-900 dark:text-gray-300 font-medium"
                            >
                              Friend
                              <br />
                              <span className="text-ascent-3 text-base">
                                Your friends
                              </span>
                            </label>
                            <input
                              id="default-radio-3"
                              type="radio"
                              value="friends"
                              name="auth"
                              onChange={(e) => {
                                setOption(e.target.value);
                              }}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </label>
                          <label
                            htmlFor="default-radio-4"
                            className="items-center mb-4 select-none w-full bg-primary flex px-5 py-2 justify-between hover:bg-ascent-3/30 rounded-xl"
                          >
                            <label
                              htmlFor="default-radio-4"
                              className="ms-2 text-gray-900 dark:text-gray-300 font-medium"
                            >
                              Only me
                              <br />
                              <span className="text-ascent-2 text-base">
                                Only show to you
                              </span>
                            </label>
                            <input
                              id="default-radio-4"
                              type="radio"
                              value="only me"
                              name="auth"
                              onChange={(e) => {
                                setOption(e.target.value);
                              }}
                              className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                            />
                          </label>
                        </div>
                      </div>
                      <div className=" flex justify-between px-6">
                        <div className="w-full flex m-3 justify-between items-center">
                          <CustomButton
                            type=""
                            Post
                            onClick={() => {
                              setAudience(false);
                              setWrite(true);
                            }}
                            containerStyles={`inline-flex justify-center rounded-full underline underline-offset-2 px-8
                    py-3 text-sm font-medium text-ascent-1 outline-none`}
                            tittle="Back"
                          />
                          <div className="w-full h-full flex-col-reverse gap-80">
                            <div className="w-full flex justify-end">
                              <CustomButton
                                type=""
                                Post
                                onClick={() => {
                                  setAudience(!audience);
                                  // setWrite(!write);
                                  console.log("press");
                                }}
                                containerStyles={`inline-flex justify-center rounded-full bg-blue px-8
                    py-3 text-sm font-medium text-white outline-none`}
                                tittle="Done"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {specific && (
                    <div className="bg-primary absolute w-full h-full flex flex-col justify-between">
                      <div className="flex w-full h-full select-none overflow-y-auto my-5">
                        <div
                          className="w-full h-full mb-20 rounded-3xl border-none
          outline-none text-xl text-ascent-1 px-5 py-3 placeholder:text-ascent-2"
                        >
                          <input
                            type="text"
                            className="w-full my-2 bg-secondary outline-none px-5 py-2 rounded-full "
                            placeholder="Search"
                          />
                          <div className="w-full flex items-center justify-center">
                            <div className="flex flex-wrap gap-2 justify-start mb-2">
                              {lists.length > 0 &&
                                lists?.map((friend) => {
                                  var check = lists.includes(friend?._id);
                                  return (
                                    <div
                                      key={friend?._id}
                                      onClick={() => {
                                        pushList(friend);
                                        console.log(lists);
                                      }}
                                      className="flex flex-col justify-center items-center"
                                    >
                                      <img
                                        src={friend?.profileUrl ?? NoProfile}
                                        alt=""
                                        className="h-16 w-full object-contain rounded-full"
                                      />
                                      <span>{friend?.firstName}</span>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div className="w-full h-full ">
                            {user?.friends.map((friend) => {
                              var check = lists.includes(friend?._id);

                              return (
                                <div
                                  onClick={() => {
                                    pushList(friend);
                                    console.log(lists);
                                  }}
                                  className={`${
                                    check ? "bg-ascent-3/10" : ""
                                  }  items-center mb-4 select-none w-full flex px-5 py-2 justify-between hover:bg-ascent-3/30 rounded-xl`}
                                >
                                  <div className="ms-2 text-gray-900 dark:text-gray-300 font-medium flex">
                                    <img
                                      src={friend?.profileUrl ?? NoProfile}
                                      alt=""
                                      className="h-16 w-16 object-cover rounded-full mr-3"
                                    />
                                    <div
                                      id={friend._id}
                                      className="h-full flex justify-center items-center"
                                    >
                                      {friend.firstName} {friend.lastName}
                                      <br />
                                      {/* <span className="text-ascent-2 text-base">
      Anyone can see
    </span> */}
                                    </div>
                                  </div>
                                  {/* <input
      id={friend._id}
      type="radio"
      value="public"
      name="auth"
      onClick={(e) => {
        // setOption(e.target.value);
        pushList(friend._id);
      }}
      className={`${}w-5 h-5 text-blue-600  border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600`}
    /> */}
                                </div>
                                // <ListCard
                                //   friend={friend}
                                //   onClick={() => {
                                //     pushList(friend);
                                //     console.log(lists);
                                //     // handleCheck(friend._id, check);
                                //   }}
                                //   check={check}
                                //   lists={lists}
                                // />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className=" flex justify-between px-6">
                        <div className="w-full flex m-3 justify-between items-center">
                          <CustomButton
                            type=""
                            Post
                            onClick={() => {
                              setSpecific(!specific);
                            }}
                            containerStyles={`inline-flex justify-center rounded-full underline underline-offset-2 px-8
                  py-3 text-sm font-medium text-ascent-1 outline-none`}
                            tittle="Back"
                          />
                          <div className="w-full h-full flex-col-reverse gap-80">
                            <div className="w-full flex justify-end">
                              {/* <CustomButton
                                type=""
                                Post
                                onClick={() => {
                                  setAudience(!audience);
                                  // setWrite(!write);
                                  console.log("press");
                                }}
                                containerStyles={`inline-flex justify-center rounded-full bg-blue px-8
                  py-3 text-sm font-medium text-white outline-none`}
                                tittle="Done"
                              /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </span>
          {/* &#8203; */}
        </div>
      </div>
    </div>
  );
};

export default Post;
