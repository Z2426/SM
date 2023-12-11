import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
import Users from "../models/userModel.js";
import Notification from "../models/NotificationModel.js";
import { calculatesTime } from "../untils/index.js";
import { recordActivity } from "../controller/historyActivityController.js";
export const getCommentAndReplyCount = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    console.log(postId);
    const postComments = await Comments.find({ postId }).populate("replies");
    let totalComments = postComments.length;
    let totalReplies = 0;
    postComments.forEach((comment) => {
      totalReplies += comment.replies.length;
    });
    let totalCommentandReplies = totalComments + totalReplies;
    const result = { totalComments, totalReplies, totalCommentandReplies }; // Tạo object chứa kết quả
    res.json(result); // Trả về kết quả dưới dạng JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments and replies" });
  }
};
export const getTimeCreatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    console.log("test getimepostcreate " + postId);
    // Lấy thông tin về bài viết từ cơ sở dữ liệu
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }
    // Tính toán thời gian tạo của bài viết
    const postTime = calculatesTime(post.createdAt);
    console.log(`createdAt :${post.createdAt} + postime:${postTime}`);
    res.status(200).json({ timeCreated: postTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createPost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const user = await Users.findById(userId);
    const { description, image } = req.body;
    if (!description) {
      next("You must provide a description");
      return;
    }
    const post = await Posts.create({
      userId,
      description,
      image,
    });
    const type = "post";
    const message = `You created post  `;
    recordActivity(user._id, type, message);
    res.status(200).json({
      sucess: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getPosts = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { search } = req.body;
    const user = await Users.findById(userId);
    const friends = user?.friends?.toString().split(",") ?? [];
    friends.push(userId);
    const searchPostQuery = {
      $or: [
        {
          description: { $regex: search, $options: "i" },
        },
      ],
    };
    const posts = await Posts.find(search ? searchPostQuery : {})
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });
    const friendsPosts = posts?.filter((post) => {
      return friends.includes(post?.userId?._id.toString());
    });
    const otherPosts = posts?.filter(
      (post) => !friends.includes(post?.userId?._id.toString())
    );
    let postsRes = null;
    if (friendsPosts?.length > 0) {
      postsRes = search ? friendsPosts : [...friendsPosts, ...otherPosts];
    } else {
      postsRes = posts;
    }
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postsRes,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.findById(id).populate({
      path: "userId",
      select: "firstName lastName location profileUrl -password",
    });
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getUserPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.find({ userId: id })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const getComments = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const postComments = await Comments.find({ postId })
      .populate({
        path: "userId",
        select: "firstName lastName location profileUrl -password",
      })
      .populate({
        path: "replies.userId",
        select: "firstName lastName location profileUrl -password",
      })
      .sort({ _id: -1 });
    res.status(200).json({
      sucess: true,
      message: "successfully",
      data: postComments,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const likePost = async (req, res, next) => {
  try {
    const { userId } = req.body.user;
    const { postId } = req.params;
    const createdBy = await Users.findById(userId);
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const index = post.likes.findIndex((pid) => pid === String(userId));
    if (index === -1) {
      post.likes.push(userId);
      const userLike = await Users.findById(userId);
      const fullNameLike = `${userLike.lastName} ${userLike.firstName}`;
      const postOwner = await Users.findById(post.userId);
      const notification = new Notification({
        userId: postOwner,
        content: `${fullNameLike} liked your post`,
        postId: postId,
        createdBy,
      });
      await notification.save();
      const type = "post";
      const message = `${createdBy.firstName} ${createdBy.lastName} liked post for  ${postOwner.lastName} `;
      recordActivity(createdBy._id, type, message);
    } else {
      post.likes = post.likes.filter((pid) => pid !== String(userId));
    }
    const newPost = await Posts.findByIdAndUpdate(postId, post, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "Successfully",
      data: newPost,
      createdBy,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const likePostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { id, rid } = req.params;
  const createdBy = await Users.findById(userId);
  try {
    if (rid === undefined || rid === null || rid === `false`) {
      const comment = await Comments.findById(id);
      const index = comment.likes.findIndex((el) => el === String(userId));
      if (index === -1) {
        comment.likes.push(userId);
        const commentOwner = await Users.findById(comment.userId);
        const notification = new Notification({
          userId: commentOwner._id,
          content: `${createdBy.firstName} ${createdBy.lastName} liked your comment.`,
          commentId: id,
          createdBy,
        });
        console.log(notification);
        await notification.save();
        const type = "post";
        const message = `You liked comment for ${commentOwner.lastName} `;
        recordActivity(createdBy._id, type, message);
      } else {
        comment.likes = comment.likes.filter((i) => i !== String(userId));
      }
      const updated = await Comments.findByIdAndUpdate(id, comment, {
        new: true,
      });
      res.status(201).json(updated);
    } else {
      const replyComments = await Comments.findOne(
        { _id: id },
        {
          replies: {
            $elemMatch: {
              _id: rid,
            },
          },
        }
      );
      const index = replyComments?.replies[0]?.likes.findIndex(
        (i) => i === String(userId)
      );
      if (index === -1) {
        replyComments.replies[0].likes.push(userId);
        const replyOwner = await Users.findById(
          replyComments.replies[0].userId
        );
        const notification = new Notification({
          userId: replyOwner._id,
          content: `${createdBy.firstName} ${createdBy.lastName} liked your reply.`,
          commentId: id,
          replyId: rid,
          createdBy,
        });
        console.log(notification);
        await notification.save();
        const type = "post";
        const message = `You liked comment for ${replyOwner.lastName} `;
        recordActivity(createdBy._id, type, message);
      } else {
        replyComments.replies[0].likes = replyComments.replies[0]?.likes.filter(
          (i) => i !== String(userId)
        );
      }
      const query = { _id: id, "replies._id": rid };
      const updated = {
        $set: {
          "replies.$.likes": replyComments.replies[0].likes,
        },
      };
      await Comments.updateOne(query, updated, { new: true });
      res.status(201).json({ message: "Successfully updated like on reply." });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const commentPost = async (req, res, next) => {
  try {
    const { comment, from } = req.body;
    const { userId } = req.body.user;
    const { postId } = req.params;
    const createdBy = await Users.findById(userId);
    // Kiểm tra comment
    if (!comment) {
      return res.status(404).json({ message: "Comment is required." });
    }
    // Tạo một comment mới và lưu vào cơ sở dữ liệu
    const newComment = new Comments({ comment, from, userId, postId });
    await newComment.save();
    // Tìm bài post
    const post = await Posts.findById(postId);
    // Thêm ID của comment vào mảng comments của bài post
    // Thêm ID của comment vào mảng comments của bài post
    post.comments.push(newComment._id);
    await post.save();
    // Tìm người chủ sở hữu của bài post
    const postOwner = post.userId; // Đây là người chủ sở hữu bài post
    const userOwner = await Users.findById(postOwner);
    // Kiểm tra xem đã có thông báo nào cho comment này chưa
    const existingNotification = await Notification.findOne({
      postId,
      commentId: newComment._id,
    });
    if (!existingNotification && String(postOwner) !== userId) {
      // Nếu chưa có thông báo và người comment không phải là chủ sở hữu của bài post, tạo thông báo mới
      const notification = new Notification({
        userId: postOwner,
        content: `${from} commented on your post`,
        postId,
        commentId: newComment._id,
        createdBy,
      });
      // Lưu thông báo vào cơ sở dữ liệu
      await notification.save();
      const type = "post";
      const message = `You commented post  for ${userOwner.firstName} `;
      recordActivity(createdBy._id, type, message);
    }

    // Trả về response cho client
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
export const replyPostComment = async (req, res, next) => {
  const { userId } = req.body.user;
  const { comment, replyAt, from } = req.body;
  const { id } = req.params;
  const createdBy = await Users.findById(userId);
  if (!comment) {
    return res.status(400).json({ message: "Comment is required." });
  }
  try {
    const commentInfo = await Comments.findById(id);
    if (!commentInfo) {
      return res.status(404).json({ message: "Comment not found." });
    }
    const commentOwner = commentInfo.userId;
    if (!commentInfo) {
      return res.status(404).json({ message: "Comment not found." });
    }
    const newReply = {
      userId,
      from,
      replyAt,
      comment,
      created_At: Date.now(),
      updated_At: Date.now(),
      likes: [], // Initialize likes array for the reply
    };
    commentInfo.replies.push(newReply);
    const savedCommentInfo = await commentInfo.save();
    // Get the index of the newly added reply (assuming it's the most recent one)
    const lastReplyIndex = savedCommentInfo.replies.length - 1;
    // Retrieve the _id (rid) of the newly added reply
    const newReplyId = savedCommentInfo.replies[lastReplyIndex]._id;
    const notification = new Notification({
      userId: commentOwner,
      content: `${from} replied to your comment in post`,
      commentId: id,
      replyId: newReplyId,
      createdBy,
    });
    await notification.save();
    const type = "post";
    const message = `You reply comment  ${replyAt} `;
    recordActivity(createdBy._id, type, message);
    res.status(200).json(savedCommentInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const posts = await Posts.findByIdAndDelete(id);
    if (posts) {
      const user = await Users.findById(posts.userId);
      const type = "post";
      const message = `You deleted post  `;
      recordActivity(user._id, type, message);
      res.status(200).json({
        success: true,
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({ message: "Post not exits", status: "Failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
