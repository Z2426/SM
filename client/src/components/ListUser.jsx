import React, { useEffect, useState } from "react";
import FriendsCard from "./FriendsCard";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { apiRequest } from "../until";
import { CiLock, CiUnlock } from "react-icons/ci";
import moment from "moment";

const UserCard = ({ user, setDetails, handleHistory, setUserInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(user);
  // console.log(moment(user?.createdAt).format("MMMM Do YYYY, h:mm:ss a"));
  const handleloading = () => {
    setIsLoading(true);
  };
  // const changeStatususer = async () => {
  //   const res = await apiRequest({
  //     url: `admin/change-status-user/${userr?._id}`,
  //     token: user?.token,
  //     data: {},
  //     method: "PUT",
  //   });
  // };

  const setUser = (user) => {
    setUserInfo(user);
  };
  const rehandleloading = () => {
    setTimeout(() => setIsLoading(false), [3000]);
  };
  // useEffect(() => {
  //   setUser(user);
  // }, []);
  return (
    <div>
      <div className="mt-5 flex rounded border-b border-[#66666690]  bg-secondary gap-5 px-5 py-5 w-full">
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
              {user?.firstName ? user?.firstName : "?"}{" "}
              {user?.lastName ? user?.lastName : "?"}
            </span>
            <span className="max-h-6 overflow-hidden">
              {user?.role ? user?.role : "?"}
            </span>
            <span className="max-h-6 overflow-hidden">
              {user?.email ? user?.email : "?"}
            </span>
            <span className="max-h-6 overflow-hidden">
              {user?.createdAt
                ? moment(user?.createdAt).format("MMMM Do YYYY")
                : "?"}
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
                <div className="">
                  {user?.statusActive === true ? (
                    <div>Active</div>
                  ) : (
                    <div>Wait</div>
                  )}
                  {/* <div className="flex px-1 items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer border rounded-full justify-center">
                <CiLock /> Lock
              </div>
              <div className="flex px-1 items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer border rounded-full justify-center">
                <CiUnlock /> Unlock
              </div> */}
                </div>

                // <input
                //   className=""
                //   type="checkbox"
                //   onChange={() => {
                //     handleloading();
                //     rehandleloading();
                //   }}
                // />
              )}
            </div>
          </div>
        </div>

        <div className="w-1/5 flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => {
              setUser(user);
              setDetails();
            }}
            className="w-full justify-center inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
          >
            View Details
          </button>
          {/* <button
        onClick={() => {
          setUser(user);
          handleHistory();
        }}
        className="w-full justify-center inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
      >
        History
      </button> */}
        </div>
      </div>
    </div>
  );
};

const DetailUser = ({ user, userInfo, setDetails, setUserInfo, fetchUser }) => {
  // const [info, setInfo] = useState();
  // setInfo(userInfo.friends);
  // console.log(userInfo);
  // console.log(userInfo.friends);
  // console.log(user);
  // console.log(info);

  const changeStatususer = async () => {
    try {
      const res = await apiRequest({
        url: `admin/change-status-user/${userInfo?._id}`,
        token: user?.token,
        data: {},
        method: "PUT",
      });
      console.log(res);
      setUserInfo(res?.data);
      fetchUser();
    } catch (error) {
      console.log(error);
    }
  };
  // const fetchFriend = async () => {
  //   const url = "/admin/detail-user/" + userInfo?.friends;
  //   const data = {
  //     // user: { userId: user?._id },
  //   };
  //   const res = await apiRequest({
  //     url: url,
  //     token: user?.token,
  //     data,
  //     method: "GET",
  //   });
  //   setInfo(res?.data);

  //   console.log(res);
  // };
  // useEffect(() => {
  //   fetchFriend();
  // }, []);
  return (
    <div className="">
      <div className="w-full h-full flex gap-7 mt-7">
        <img
          className="h-20 w-20 object-cover ml-7 rounded-full"
          src={
            userInfo?.profileUrl
              ? userInfo?.profileUrl
              : `https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg`
          }
        />
        <div className="flex flex-col w-1/6 items-end">
          <span className="text-ascent-2">First name: </span>
          <span className="text-ascent-2">Last name: </span>
          <span className="text-ascent-2">Role: </span>
          <span className="text-ascent-2">Email: </span>
          {/* <span className="text-ascent-2">Password: </span> */}
          <span className="text-ascent-2">Join at: </span>
          <span className="text-ascent-2">Verified: </span>
        </div>
        <div className="w-full text-ascent-1 text-base flex flex-col items-start">
          <span className="max-h-6 overflow-hidden">
            {userInfo?.firstName ? userInfo?.firstName : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {userInfo?.lastName ? userInfo?.lastName : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {userInfo?.role ? userInfo?.role : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {userInfo?.email ? userInfo?.email : "?"}
          </span>
          {/* <span className="max-h-6 overflow-hidden">
            {userInfo?.password ? userInfo?.password : "?"}
          </span> */}
          <span className="max-h-6 overflow-hidden">
            {userInfo?.createdAt
              ? moment(user?.createdAt).format("MMMM Do YYYY")
              : "?"}
          </span>
          <span className="max-h-6 overflow-hidden">
            {userInfo?.verified === true ? "True" : "False"}
          </span>
          <div></div>
        </div>
        <div className="w-1/5 flex flex-col items-center justify-center gap-2">
          <div onClick={changeStatususer}>
            {userInfo?.statusActive ? (
              <div className="flex px-1 items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer border rounded-full justify-center">
                <CiLock /> Lock
              </div>
            ) : (
              <div className="flex px-1 items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer border rounded-full justify-center">
                <CiUnlock /> Unlock
              </div>
            )}
          </div>

          <button
            onClick={setDetails}
            className="inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full"
          >
            Back
          </button>
        </div>
      </div>
      {/* {userInfo.friends &&
        userInfo?.friends.map((info) => {
          <FriendsCard friends={info} />;
        })} */}
      {/* <div className="w-full h-full overflow-hidden">
        <div className="flex items-center justify-between text-ascent-1 bp-2 border-b border-[#66666645]">
          <span> Friends</span>
        </div>
        <FriendsCard friend={userInfo} />
        <FriendsCard friend={userInfo} />
        <FriendsCard friend={userInfo} />
      </div> */}
    </div>
  );
};

const History = ({ user, userInfo, handleHistory }) => {
  const [info, setInfo] = useState();
  const fetchHistory = async () => {
    // http://localhost:8800/admin/history-activity/:idUser
    const url = "/admin/history-activity/" + userInfo?._id;
    const data = {
      // user: { userId: user?._id },
    };
    const res = await apiRequest({
      url: url,
      token: user?.token,
      data,
      method: "GET",
    });
    setInfo(res?.Activities);

    console.log(res);
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  return (
    <div className="text-ascent-1 w-full h-full flex flex-col gap-5">
      <div className="mt-5 flex flex-col w-fit">
        <span className="border-b text-center">
          {userInfo?.firstName + " " + userInfo?.lastName}
        </span>
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
            {info?.map((one) => (
              <tr key={one?._id}>
                <td className="h-20 overflow-hidden cursor-default">
                  {one?.formattedDate}
                </td>
                <td>{one?.formattedTime}</td>
                <td>{one?.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ListUser = ({ listUser, fetchUser, setListUser }) => {
  const { user } = useSelector((state) => state.user);
  const [detail, setDetails] = useState(false);
  const [history, setHistory] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("email");
  const [type, setType] = useState("asc");
  const [listmanager, setListmanager] = useState([
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "Nguyễn",
      following: [],
      friends: [],
      lastName: "Takt",
      location: "VietNam",
      profileUrl:
        "https://res.cloudinary.com/dr91wukb1/image/upload/v1730531001/SOCIALMEDIA/g2og0hxbfrh56oiadfum.png",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "smith",
      location: "VietNam",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "Nguyễn",
      following: [],
      friends: [],
      lastName: "Huy",
      location: "VietNam",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "John",
      following: [],
      friends: [],
      lastName: "smith",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "kushner",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "kushner",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "kushner",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "kushner",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
    {
      createdAt: "2024-09-14T06:57:38.122Z",
      email: "toan6858@gmail.com",
      firstName: "joshua",
      following: [],
      friends: [],
      lastName: "kushner",
      location: "New York",
      role: "Admin",
      statusActive: true,
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmU1MzNlMmI1MTQ1NTlhODA2ZjdmYzMiLCJleHAiOjE3NDYyNzEwMzEsImlhdCI6MTczMDcxOTAzMX0.ZgRy1JRcgxzPFRQSeMZlMYO-uSJprZLdrh1isI0P7Dg",
      updatedAt: "2024-11-02T07:05:03.542Z",
      verified: true,
      views: [],
      __v: 2,
      _id: "66e533e2b514559a806f7fc3",
    },
  ]);
  console.log("list12312313123manager");
  console.log(listmanager);
  // console.log(type);
  console.log(user);

  const handledetails = () => {
    setDetails(!detail);
  };
  const handleFilter = async () => {
    try {
      const url = `/admin/sort-user?type=${role}&typeSort=${type}`;
      console.log(url);
      const res = await apiRequest({
        url: url,
        token: "",
        data: {},
        method: "GET",
      });
      console.log(res?.users);
      setListUser(res?.users);
    } catch (error) {
      console.log(error);
    }
  };
  const handleHistory = () => {
    setHistory(!history);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
      fetchUser();
    } else {
      try {
        console.log(`/admin/search?${search}`);
        const res = await apiRequest({
          url: `/admin/search?keyword=${search}`,
          token: user?.token,
          data: {},
          method: "GET",
        });
        console.log(res);
        //setsuggestedFriends(res);
        setListUser(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  //console.log(listUser);
  return (
    <div className="w-full h-full flex flex-col">
      {detail ? (
        <DetailUser
          user={user}
          userInfo={userInfo}
          setDetails={handledetails}
          setUserInfo={setUserInfo}
          fetchUser={fetchUser}
        />
      ) : (
        <>
          {history ? (
            <History
              user={user}
              userInfo={userInfo}
              handleHistory={handleHistory}
            />
          ) : (
            <div>
              <div className="w-full justify-center flex flex-col items-center">
                <div className="w-1/2">
                  <form
                    className="hidden md:flex items-center justify-center gap-5 mt-2"
                    onSubmit={(e) => handleSearch(e)}
                  >
                    <input
                      className="bg-primary placeholder:text-[#666] pl-1 border-[#66666690] border-b w-full 
                      outline-none text-ascent-2"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />

                    <button
                      onClick={() => {}}
                      type={"submit"}
                      className={`inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 mt-2 rounded-full`}
                    >
                      Search
                    </button>
                  </form>
                </div>
                <div className="flex gap-1 shrink-0 items-center w-1/2 justify-center">
                  <label className="text-ascent-1">Filter:</label>
                  <select
                    className="bg-primary text-ascent-1 outline outline-1 focus:ring-4 rounded-full "
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="email">Email</option>
                    <option value="firstName">First Name</option>
                    <option value="timeCreated">Time Join</option>
                  </select>
                  <select
                    className=" bg-primary text-ascent-1 outline outline-1 focus:ring-4 rounded-full "
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                  </select>
                  <button
                    onClick={handleFilter}
                    className={`inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 rounded-full`}
                  >
                    Apply
                  </button>
                  <button
                    onClick={fetchUser}
                    className={`inline-flex items-center text-base bg-[#0444a4] text-white px-5 py-1 rounded-full`}
                  >
                    Reset
                  </button>
                </div>
              </div>
              {listmanager.map((user) => {
                return (
                  <UserCard
                    key={user?._id}
                    user={user}
                    setDetails={handledetails}
                    handleHistory={handleHistory}
                    setUserInfo={setUserInfo}
                  />
                );
              })}

              {/* <UserCard
                key={user?._id}
                user={user}
                setDetails={handledetails}
                handleHistory={handleHistory}
                setUserInfo={setUserInfo}
              /> */}
              {/* {listUser?.length > 0 ? (
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
                <div className="w-full h-full text-ascent-1 flex justify-center items-center">
                  Something was wrong
                </div>
              )} */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ListUser;
