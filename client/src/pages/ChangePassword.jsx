import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CustomButton, Loading, TextInput } from "../components";
import { apiRequest, checkresetpassword } from "../until";
import { redirect, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const ChangePassword = () => {
  const [errMsg, seterrMsg] = useState("");
  const [checkpassword, setcheckpassword] = useState("");
  const [isSubmitting, setisSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { id, token } = useParams();
  console.log(id, token);

  const check = async () => {
    try {
      const uri = "/users/reset-password/" + id + "/" + token;
      console.log(uri);
      const res = await checkresetpassword(uri);
      console.log(res);
      if (res.status === "FAILED") {
        document.cookie = res.message;
        setStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    check();
    setIsLoading(false);
  }, []);

  const handleresetSubmit = async (data) => {
    console.log(data);
    if (data.pass !== data.repass) {
      setcheckpassword({ status: "failed", message: "Passwords do not match" });
      return;
    } else {
      setcheckpassword("");
    }
    const newData = {
      userId: id,
      password: data.pass,
    };

    console.log(newData);
    setisSubmitting(true);
    try {
      const res = await apiRequest({
        url: `/users/reset-password`,
        data: newData,
        method: "POST",
      });
      console.log(res);
      if (res?.success === "failed") {
        seterrMsg(res);
      } else {
        setcheckpassword({ status: "success", message: res.message });
        //seterrMsg(res);
        setTimeout(() => {
          window.location.replace("/login");
        }, 5000);
      }
      setisSubmitting(false);
    } catch (error) {
      console.log(error);
      setisSubmitting(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <div
          className="w-full h-[100vh] bg-bgColor flex items-center itemscenter 
justify-center p-6"
        >
          <Loading />
        </div>
      ) : (
        <>
          {status ? (
            <ErrorPage />
          ) : (
            <div
              className="w-full h-[100vh] bg-bgColor flex items-center itemscenter 
      justify-center p-6"
            >
              <div className="bg-primary w-ful md:w-1/3 2xl:w-1/4 px-6 py-8 shadow-md rounded-lg">
                <p className="text-ascent-1 text-lg font-semibold">
                  Reset Password
                </p>

                <span className="text-sm text-ascent-2">
                  Enter the new password
                </span>

                <form
                  onSubmit={handleSubmit(handleresetSubmit)}
                  className="py-4 flex flex-col gap-5"
                >
                  <TextInput
                    name="pass"
                    placeholder="New Password"
                    type="password"
                    register={register("pass", {
                      required: "Required!",
                    })}
                    styles="w-full rounded-lg"
                    labelStyles="ml-2"
                    error={errors.pass ? errors.pass.message : ""}
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

                  <TextInput
                    name="repass"
                    placeholder="Enter the password"
                    type="password"
                    register={register("repass", {
                      required: "Required!",
                    })}
                    styles="w-full rounded-lg "
                    labelStyles="ml-2"
                    error={errors.repass ? errors.repass.message : ""}
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
                  {checkpassword && (
                    <span
                      role="alert"
                      className={`text-sm ${
                        checkpassword?.status === "failed"
                          ? "text-[#f64949fe] "
                          : "text-[#2ba150fe]"
                      }
                 mt-0.5`}
                    >
                      {checkpassword?.message}
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
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChangePassword;
