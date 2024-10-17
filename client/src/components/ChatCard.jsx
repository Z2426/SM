import React, { useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
const ChatCard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-full bg-transparent text-ascent-1 flex justify-end">
      {/* {LEFT} */}
      <div className="bg-transparent w-full flex justify-end">
        {/* <div className="h-full w-2/3 bg-primary flex flex-col py-1 rounded-xl overflow-hidden">
          <div className="h-1/6 w-full px-3 py-1 bg-white overflow-hidden ">
            <div className="aspect-square h-full bg-transparent overflow-hidden flex flex-col justify-center cursor-pointer">
              <img
                src={user?.profileUrl}
                className="h-full w-auto object-cover rounded-full"
              />
            </div>
          </div>
          <div className="h-full w-full px-2 py-1 bg-blue"></div>
          <div className="w-full flex px-4 gap-2 py-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="bg-secondary px-3 py-1 rounded-2xl w-full"
            />
            <button className="bg-blue px-3 rounded-2xl">Send</button>
          </div>
        </div> */}
      </div>
      {/* {RIGHT} */}
      <div className=" w-1/6 overflow-y-auto bg-transparent flex flex-col box-border  justify-end px-5 gap-y-3 py-3">
        {/* <div className="aspect-square w-full bg-transparent overflow-hidden flex flex-col justify-center cursor-pointer">
          <img
            src={user?.profileUrl}
            className="h-full w-auto object-cover rounded-full"
          />
        </div> */}
        <div className="aspect-square w-full bg-transparent overflow-hidden flex flex-col justify-center cursor-pointer">
          <img
            src={user?.profileUrl}
            className="h-full w-auto object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
export default ChatCard;
