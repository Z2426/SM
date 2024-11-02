import React, { useState } from "react";
import { NoProfile } from "../assets";
const ListCard = ({ friend, onClick, list, check }) => {
  const [checks, setChecks] = useState(false);
  console.log(checks);

  const handle = () => {};
  //   list.includes(friend.id) ? setCheck("bg-ascent-3/10") : setCheck("");
  return (
    <div
      onClick={onClick}
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
  );
};

export default ListCard;
