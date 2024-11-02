import axios from "axios";
import { SetPosts } from "../redux/postSlice";
import { redirect } from "react-router-dom";

const API_URL = "http://localhost:8800";
export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
});
export const apiRequest = async ({ url, token, data, method }) => {
  try {
    console.log(url, token, data, method);
    const result = await API(url, {
      method: method || "GET",
      data: data,
      headers: {
        "content-type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    console.log(result);

    return result?.data;
  } catch (error) {
    const err = error.response.data;

    console.log(err);
    // if(err?.status === )
    // if (err?.status === "failed") {
    //   console.log(1);
    //   //return redirect("http://localhost:3000/error");
    // }
    return { status: err.status, message: err.message };
    //return <Redirect  to="/error" error={error} />;
    //return history.push("/error", error={err?.message})
  }
};
export const handFileUpload = async (uploadFile) => {
  const formData = new FormData();
  formData.append("file", uploadFile);
  formData.append("upload_preset", "social media");
  console.log(formData);
  try {
    const reponse = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/image/upload/`,
      formData
    );
    //console.log(reponse);
    return reponse.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};

export const checkresetpassword = async (uri) => {
  try {
    const res = await apiRequest({
      url: uri,
      method: "GET",
      data: {},
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = async (token, dispatch, uri, data) => {
  // console.log("Data: " + data);
  try {
    const res = await apiRequest({
      url: uri || "/posts",
      token: token,
      method: "POST",
      data: data || {},
    });
    console.log("fetch: " + res?.data);
    dispatch(SetPosts(res?.data));
    return;
  } catch (error) {
    console.log(error);
  }
};
export const likePost = async ({ uri, token }) => {
  try {
    console.log(uri);

    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (id, token) => {
  try {
    const res = await apiRequest({
      url: "/posts/" + id,
      token: token,
      method: "DELETE",
    });
    return;
  } catch (error) {
    console.log(error);
  }
};
export const getUserInfo = async (token, id) => {
  try {
    //console.log(id);
    //console.log(token);
    const uri = id === undefined ? "/users/get-user" : "/users/get-user/" + id;
    //console.log(uri);
    const res = await apiRequest({
      url: uri,
      token: token,
      method: "POST",
    });
    //console.log(res);
    if (res?.message === "Authetication fail") {
      localStorage.removeItem("user");
      window.alert("User session expired .Login again");
      window.location.replace("/login");
    }

    return res?.user;
  } catch (error) {
    console.log(error);
  }
};
export const sendFriendRequest = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/friend-request",
      token: token,
      method: "POST",
      data: { requestTo: id },
    });
    console.log(res);
    return;
  } catch (error) {
    console.log(error);
  }
};
export const viewUserProfile = async (token, id) => {
  try {
    const res = await apiRequest({
      url: "/users/profile-view",
      token: token,
      method: "POST",
      data: { id },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const checktoken = async ({ token }) => {
  console.log(token);
  try {
    const res = await apiRequest({
      url: "/test/token-valid",
      method: "GET",
      data: {},
      token: token,
    });
    console.log(this.res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const fetchNotifications = async ({ token, dispatch, userId, data }) => {
  try {
    const res = await apiRequest({
      url: "/notifications",
      token: token,
      method: "GET",
      data: data || {},
    });
    //console.log(res);
    //dispatch(SetPosts(res?.data));
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const uploadVideo = async (videoFile) => {
  const formData = new FormData();
  formData.append("file", videoFile);
  formData.append("upload_preset", "social_media_video"); // Sử dụng một preset cụ thể cho video
  formData.append("resource_type", "video"); // Chỉ định loại tài nguyên là video
  console.log(formData);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_ID}/video/upload/`,
      formData
    );

    console.log(response);
    return response.data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
