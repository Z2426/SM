import React, { useEffect, useState } from "react";
import FriendsCard from "./FriendsCard";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { apiRequest } from "../until";

const UserCard = ({ user, setDetails, handleHistory, setUserInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleloading = () => {
    setIsLoading(true);
  };

  const setUser = (user) => {
    setUserInfo(user);
  };
  const rehandleloading = () => {
    setTimeout(() => setIsLoading(false), [3000]);
  };
  return (
    <div className="mt-5 flex rounded border border-[#66666690]  bg-secondary gap-5 px-5 py-5 w-full">
      <img
        className="h-20 w-20 object-cover rounded-full"
        src={
          user?.profileUrl
            ? user?.profileUrl
            : `https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`
        }
        alt="Avatar"
      />
      <div className="flex w-full gap-4">
        <div className="flex flex-col text-right">
          <span className="text-ascent-2">Name: </span>
          <span className="text-ascent-2">Role: </span>
          <span className="text-ascent-2">Email: </span>
          <span className="text-ascent-2">Join at: </span>
          <span className="text-ascent-2">Verified: </span>
          <span className="text-ascent-2">Activity: </span>
        </div>
        <div className="w-full text-ascent-1 text-base flex flex-col items-start">
          <span className="max-h-6 overflow-hidden">
            {user?.firstName ? user?.firstName : "?"}
            {user?.lastName ? user?.lastName : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {user?.role ? user?.role : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {user?.email ? user?.email : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {user?.timecreated ? user?.timecreated : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {user?.verified === true ? "True" : "False"}
          </span>
          <div>
            {isLoading ? (
              <div className="mt-2">
                <Loading />
              </div>
            ) : (
              <input
                className=""
                type="checkbox"
                onChange={() => {
                  handleloading();
                  rehandleloading();
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="w-1/5 flex flex-col items-center justify-center gap-2">
        <button
          onClick={() => {
            setDetails();
            setUser(user);
          }}
          className="w-full justify-center inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
        >
          View Details
        </button>
        <button
          onClick={handleHistory}
          className="w-full justify-center inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
        >
          History
        </button>
      </div>
    </div>
  );
};

const DetailUser = ({ user, userInfo, setDetails }) => {
  const [info, setInfo] = useState();
  console.log(user);
  const fetchFriend = async () => {
    const url = "/admin/detail-user/" + userInfo?._id;
    const data = {
      // user: { userId: user?._id },
    };
    const res = await apiRequest({
      url: url,
      token: user?.token,
      data,
      method: "GET",
    });
    setInfo(res?.data);

    console.log(res);
  };
  useEffect(() => {
    fetchFriend();
  }, []);
  return (
    <div className="">
      <div className="w-full h-full flex gap-7 mt-7">
        <img
          className="h-20 w-20 object-cover ml-7 rounded-full"
          src={
            info?.profileUrl
              ? info?.profileUrl
              : `https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`
          }
        />
        <div className="flex flex-col w-1/6 items-end">
          <span className="text-ascent-2">First name: </span>
          <span className="text-ascent-2">Last name: </span>
          <span className="text-ascent-2">Role: </span>
          <span className="text-ascent-2">Email: </span>
          <span className="text-ascent-2">Password: </span>
          <span className="text-ascent-2">Join at: </span>
          <span className="text-ascent-2">Verified: </span>
        </div>
        <div className="w-full text-ascent-1 text-base flex flex-col items-start">
          <span className="max-h-6 overflow-hidden">
            {info?.firstName ? info?.firstName : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.lastName ? info?.lastName : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.role ? info?.role : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.email ? info?.email : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.password ? info?.password : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.timecreated ? info?.timecreated : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {info?.verified === true ? "True" : "False"}
          </span>
          <div></div>
        </div>
        <div className="w-1/5 flex flex-col items-center justify-center gap-2">
          <button
            onClick={setDetails}
            className="inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
          >
            Back
          </button>
        </div>
      </div>
      <FriendsCard friends={info?.friends} />
    </div>
  );
};

const History = ({ handleHistory }) => {
  return (
    <div className="text-ascent-1 w-full h-full flex flex-col gap-5">
      <div className="mt-5 flex flex-col w-fit">
        <span className="border-b text-center">History user</span>
        <button
          onClick={handleHistory}
          className="w-full justify-center inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
        >
          Back
        </button>
      </div>
      <div className="w-full flex justify-center">
        <table className="table-fixed w-full text-center border rounded-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="h-20 overflow-hidden cursor-default">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ListUser = ({ listUser }) => {
  const { user } = useSelector((state) => state.user);
  const [detail, setDetails] = useState(false);
  const [history, setHistory] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const handledetails = () => {
    setDetails(!detail);
  };
  const handleHistory = () => {
    setHistory(!history);
  };
  console.log(listUser);
  return (
    <div className="w-full h-full flex flex-col">
      {detail ? (
        <DetailUser
          user={user}
          userInfo={userInfo}
          setDetails={handledetails}
        />
      ) : (
        <>
          {history ? (
            <History handleHistory={handleHistory} />
          ) : (
            <div>
              {listUser?.length > 0 ? (
                listUser?.map((user) => (
                  <UserCard
                    key={user?._id}
                    user={user}
                    setDetails={handledetails}
                    handleHistory={handleHistory}
                    setUserInfo={setUserInfo}
                  />
                ))
              ) : (
                <div>Something was wrong</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListUser;
