import React, { useState } from "react";
// import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdatePost, UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handFileUpload } from "../until";
import ReactQuill from "react-quill";
import { CiImageOn, CiShoppingTag } from "react-icons/ci";
import { useForm } from "react-hook-form";
const Post = ({ onEvent }) => {
  const { user, post } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, seterrMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [picture, setPicuter] = useState(null);
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState([]);
  const [preview, setPreview] = useState(false);
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false);
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

  const handlePostSubmit = async (data) => {
    setPosting(true);
    setPreview(false);
    seterrMsg("");

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
          <span className="h-full flex justify-center items-center sm:inline-block sm:align-middle sm:h-screen">
            <form onSubmit={handleSubmit(handlePostSubmit)}>
              <div
                className="inline-block align-bottom bg-primary rounded-3xl
            text-left overflow-hidden shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full "
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
                {/* <div className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6">
              <ReactQuill onChange={(ev) => setContent(ev)} modules={modules} />
            </div> */}
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
                        errors.description ? errors.description.message : ""
                      }
                      className="w-full h-72 mb-20 bg-primary rounded-3xl border-none
            outline-none text-3xl text-ascent-1 
            px-4 py-3 placeholder:text-ascent-2 resize-none"
                      value={content}
                      placeholder="Write something about post"
                      onChange={(ev) => {
                        setContent(ev.target.value);
                      }}
                    />
                    <div className="flex gap-3">
                      <div className="w-fit py-1 flex outline-1 px-3 text-[#04c922] bg-[#072b0c] rounded-full outline  justify-center items-center cursor-pointer ">
                        <CiShoppingTag />
                        <div className="hover:text-ascent-1">Tags</div>
                      </div>

                      <div className="w-fit py-1 flex outline-1 px-3 text-[#345cd9] bg-[#06133d] rounded-full outline  justify-center items-center cursor-pointer">
                        <label
                          htmlFor="imgUpload"
                          className="flex items-center gap-1 text-base text-[#345cd9] hover:text-ascent-1 cursor-pointer"
                        >
                          <input
                            type="file"
                            onChange={(e) => handlePreview(e.target.files[0])}
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
                    {preview && (
                      <div className="py-4 flex items-end gap-3">
                        {/* <span className="text-ascent-1">
                    Preview {file.type.includes("image") ? "Image" : "Video"}
                  </span> */}
                        {file.type.includes("image") ? (
                          <img
                            className="w-20 mt-2 rounded-lg border-solid border-[#345cd9]"
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
                        )}
                        <span
                          className="text-ascent-1 h-fit cursor-pointer rounded-full px-4 py-1 bg-[#0444a4]"
                          onClick={() => {
                            setPreview(false);
                            setFile(null);
                          }}
                        >
                          Delete
                        </span>
                      </div>
                    )}
                    <div className="w-full flex justify-end">
                      {posting ? (
                        <Loading />
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
                {/* <form
              className="px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                label="First Name"
                placeholder="First Name"
                type="text"
                styles="w-full"
                register={register("firstName", {
                  required: "First name is required",
                })}
                error={errors.firstName ? errors.firstName?.message : ""}
              />
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                type="text"
                styles="w-full"
                register={register("lastName", {
                  required: "Last name is required!",
                })}
                error={errors.lastName ? errors.lastName?.message : ""}
              />
              <TextInput
                label="profession"
                placeholder="Profession"
                type="text"
                styles="w-full"
                register={register("profession", {
                  required: "Profession is required!",
                })}
                error={errors.profession ? errors.profession?.message : ""}
              />

              <TextInput
                label="Location"
                placeholder="Location"
                type="text"
                styles="w-full"
                register={register("location", {
                  required: "Location do no match",
                })}
                error={errors.location ? errors.location?.message : ""}
              />

              <label
                className="flex items-center gap-1 text-base text-ascent-2
              hover:text-ascent cursor-pointer my-4"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  className=""
                  id="imgUpload"
                  onChange={(e) => handleSelect(e)}
                  accept=".jpg, .png, .jpeg"
                />
              </label>

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

              <div className="py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]">
                {isSubmitting ? (
                  <Loading />
                ) : (
                  <CustomButton
                    type="submit"
                    containerStyles={`inline-flex justify-center rounded-md bg-blue px-8
                    py-3 text-sm font-medium text-white outline-none`}
                    tittle="Submit"
                  />
                )}
              </div>
            </form> */}
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
