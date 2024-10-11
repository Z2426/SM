import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import TextInput from "./TextInput";
import Loading from "./Loading";
import CustomButton from "./CustomButton";
import { UpdateProfile, UserLogin } from "../redux/userSlice";
import { apiRequest, handFileUpload } from "../until";

const EditFix = () => {
  const { user, edit } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [errMsg, seterrMsg] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [picture, setPicuter] = useState(null);
  const [editor, setEditor] = useState(1);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { ...user },
  });

  console.log(user);

  const [checkpassword, setcheckpassword] = useState("");

  const partialEmail = user?.email.replace(
    /(\w{3})[\w.-]+@([\w.]+\w)/,
    "$1***@$2"
  );
  // console.log(partialEmail);
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

  // const handleresetSubmit = async (data) => {
  //   console.log(data);
  //   if (data.pass !== data.repass) {
  //     setcheckpassword({ status: "failed", message: "Passwords do not match" });
  //     return;
  //   } else {
  //     setcheckpassword("");
  //   }
  //   const newData = {
  //     userId: user.userId,
  //     password: data.pass,
  //   };

  //   console.log(newData);
  //   setisSubmitting(true);
  //   try {
  //     const res = await apiRequest({
  //       url: `/users/reset-password`,
  //       data: newData,
  //       method: "POST",
  //     });
  //     console.log(res);
  //     if (res?.success === "failed") {
  //       seterrMsg(res);
  //     } else {
  //       setcheckpassword({ status: "success", message: res.message });
  //       //seterrMsg(res);
  //       setTimeout(() => {
  //         window.location.replace("/login");
  //       }, 5000);
  //     }
  //     setisSubmitting(false);
  //   } catch (error) {
  //     console.log(error);
  //     setisSubmitting(false);
  //   }
  // };
  const validateemail = (email) => {};

  const handleresetSubmit = async (data) => {
    console.log(data);
    setisSubmitting(true);
    try {
      const res = await apiRequest({
        url: "/users/request-passwordreset",
        data: data,
        method: "POST",
      });
      if (res?.status === "FAILED") {
        seterrMsg(res);
      } else {
        seterrMsg(res);
      }
      setisSubmitting(false);
    } catch (error) {
      console.log(error);
      setisSubmitting(false);
    }
  };

  const handleClose = () => {
    dispatch(UpdateProfile(false));
  };

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
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
          &#8203;
          <div
            className="inline-block align-bottom bg-primary rounded-2xl
            text-left overflow-hidden shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="flex justify-between px-6 pt-5 pb-2">
              <label
                htmlFor="name"
                className="block text-xl text-ascent-1 font-bold w-full text-center"
              >
                Edit Profile
              </label>

              <button className="text-ascent-1" onClick={handleClose}>
                <MdClose size={22} />
              </button>
            </div>
            <div className="flex text-ascent-1 px-5 w-full justify-around gap-2 my-2">
              <span
                className={` px-2 w-full text-center py-2 rounded-2xl hover:cursor-pointer  ${
                  editor == 1
                    ? "bg-blue text-ascent-1"
                    : "text-ascent-2 outline outline-1"
                }  `}
                onClick={() => setEditor(1)}
              >
                Profile
              </span>
              <span
                className={` px-2 w-full text-center py-2 rounded-2xl hover:cursor-pointer  ${
                  editor == 2
                    ? "bg-blue text-ascent-1"
                    : "text-ascent-2 outline outline-1"
                }  `}
                onClick={() => setEditor(2)}
              >
                Social Links
              </span>
              <span
                className={` px-2 w-full text-center py-2 rounded-2xl hover:cursor-pointer   ${
                  editor == 3
                    ? "bg-blue text-ascent-1"
                    : "text-ascent-2 outline outline-1"
                }  `}
                onClick={() => setEditor(3)}
              >
                Expertise
              </span>
              <span
                className={` px-2 w-full text-center py-2 rounded-2xl hover:cursor-pointer  ${
                  editor == 4
                    ? "bg-blue text-ascent-1"
                    : "text-ascent-2 outline outline-1"
                }  `}
                onClick={() => setEditor(4)}
              >
                Experience
              </span>
              <span
                className={` px-2 w-full text-center py-2 rounded-2xl hover:cursor-pointer  ${
                  editor == 5
                    ? "bg-blue text-ascent-1"
                    : "text-ascent-2 outline outline-1"
                }  `}
                onClick={() => setEditor(5)}
              >
                Password
              </span>
            </div>
            {editor == 1 ? (
              <form
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
              </form>
            ) : editor == 5 ? (
              <div className="bg-primary w-ful px-6 py-8 shadow-md rounded-lg">
                <p className="text-ascent-1 text-lg font-semibold">
                  Email Address
                </p>

                <span className="text-sm text-ascent-2">
                  {/* Enter email address used during registration */}
                  {partialEmail}
                </span>

                <form
                  onSubmit={handleSubmit(handleresetSubmit)}
                  className="py-4 flex flex-col gap-5"
                >
                  <TextInput
                    name="email"
                    placeholder="email@example.com"
                    type="email"
                    register={register("validate_email", {
                      // required: "Email Address is required!",
                      validate: (value) => {
                        const { email } = getValues();

                        if (email != value) {
                          return "Email do no match";
                        }
                      },
                    })}
                    styles="w-full rounded-lg"
                    labelStyles="ml-2"
                    error={
                      errors.validate_email ? errors.validate_email.message : ""
                    }
                  />
                  {errMsg?.message && (
                    <span
                      role="alert"
                      className={`text-sm ${
                        errMsg?.status === "failed"
                          ? "text-[#f64949fe] "
                          : "text-[#2ba150fe]"
                      } mt-0.5`}
                    >
                      {errMsg?.message}
                    </span>
                  )}

                  {isSubmitting ? (
                    <Loading />
                  ) : (
                    <CustomButton
                      type="submit"
                      containerStyles={`inline-flex justify-center
               rounded-md bg-blue px-8 py-3 text-sm font-medium 
               text-white outline-non`}
                      tittle="Submit"
                    />
                  )}
                </form>
              </div>
            ) : (
              <>
                <div className="w-full h-56 text-center text-ascent-1">
                  <div className="flex justify-center items-center h-full w-full">
                    In progress
                  </div>
                </div>
              </>
            )}
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
        </div>
      </div>
    </div>
  );
};

export default EditFix;
