import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { NoProfile } from "../assets";
import { CiImageOff } from "react-icons/ci";
const ImageCheck = ({ img, review, setReview }) => {
  //   const [temp, setTemp] = useState(img);
  return (
    <div className=" z-50 w-full h-full bg-bgColor/50">
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 h-2/3 rounded-2xl flex justify-center items-center">
          {
            <div className="py-4 w-fit h-fit flex justify-center gap-3 rounded-3xl overflow-hidden">
              <div className="flex relative w-fit h-fit rounded-xl justify-center items-center">
                {img ? (
                  <img
                    src={img ?? NoProfile}
                    alt="Something wrong"
                    className="rounded-2xl"
                  />
                ) : (
                  <div className=" text-ascent-1 w-60 h-60 flex justify-center items-center bg-primary rounded-xl">
                    <CiImageOff size={30} />
                  </div>
                )}
                <div
                  onClick={() => {
                    setReview(!review);
                    // setTemp(null);
                  }}
                  className="rotate-45 cursor-pointer absolute right-5 top-5 bg-[#000000] rounded-full opacity-70 w-10 h-10 text-white flex justify-center items-center"
                >
                  <AiOutlinePlus size={30} className="font-thin" />
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
};
export default ImageCheck;
