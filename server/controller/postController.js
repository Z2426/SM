import Comments from "../models/commentModel.js";
import Posts from "../models/postModel.js";
//handle comment
// get all comment of post
export const getComments= async(req,res)=>{
  try {
    const comments = await Comments.find({ postId: req.params.postId }).populate("userId", "-password")
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
//POST create comment
export const commentPost= async(req,res)=>{
  try {
    const {userId} =req.body.user;
    const {postId} =req.params;
    const {comment, from } = req.body;
    const newComment = new Comments({ userId, postId, comment, from });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const getRepliesByComment =async(req,res)=>{
  try {
    const comment = await Comments.findById(req.params.commentId).populate("replies.userId", "-password");
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    res.status(200).json(comment.replies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const replyPostComment = async (req, res) => {
  try {
    const { userId } = req.body.user; 
    const { from, comment } = req.body; 
    const reply = { userId, from, comment }; 
    const updatedComment = await Comments.findByIdAndUpdate(
      req.params.commentId,
      { $push: { replies: reply } },
      { new: true } 
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(201).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const likePostComment = async(req,res)=>{

}
// PUT : edit content comment
export const editComment =async (req,res)=>{
  try {
    const {comment,from} = req.body
    const updatedComment = await Comments.findByIdAndUpdate(req.params.commentId, {comment,from} , { new: true });
    if (!updatedComment) return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json(updatedComment);
  } catch (error) {
   return  res.status(500).json({ message: error.message });
  }
}
export const deleteComment = async(req,res)=>{
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.commentId);
    if (!deletedComment) return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    return  res.status(500).json({ message: error.message });
  }
}
export const editReply = async (req, res) => {
  try {
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    const reply = comment.replies.id(req.params.replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });
    const { commentReply, from } = req.body;
    if (!commentReply) {
      return res.status(400).json({ message: "Comment reply is required" });
    }
    reply.set({ comment: commentReply, from :from });
    await comment.save();
    res.status(200).json(reply);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export const deleteReply = async(req,res)=>{
  try {
    const comment = await Comments.findById(req.params.commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    const replyIdToDelete = req.params.replyId;
    const reply = comment.replies.id(replyIdToDelete);
    if (!reply) return res.status(404).json({ message: "Reply not found" });
    comment.replies = comment.replies.filter(rep => rep._id.toString() !== replyIdToDelete);
    comment.replies = comment.replies.filter(rep => rep.comment && rep.from);
    await comment.save();
    res.status(200).json({ message: "Reply deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
// UPDATE
//  like post, comment, reply
export const toggleLike = async (req, res) => {
  const { entityId, type } = req.params;  // entityId là ID của post, comment hoặc reply
  const { userId } = req.body.user;
  try {
    let entity;
    // Xác định loại entity (post, comment, reply)
    switch (type) {
      case "post":
        entity = await Posts.findById(entityId);
        break;
      case "comment":
        entity = await Comments.findById(entityId);
        break;
      case "reply":
        // Tìm kiếm comment chứa reply
        entity = await Comments.findOne({ "replies._id": entityId });
        if (entity) {
          const reply = entity.replies.id(entityId);  // Lấy reply dựa trên ID trong comment
          if (reply.likes.includes(userId)) {
            // Nếu đã like reply thì bỏ like
            reply.likes = reply.likes.filter(id => id.toString() !== userId);
          } else {
            // Nếu chưa like reply thì thêm like
            reply.likes.push(userId);
          }
          await entity.save();
          return res.status(200).json({ message: `Toggled like on reply`, likes: reply.likes.length });
        } else {
          return res.status(404).json({ message: "Reply not found" });
        }
      default:
        return res.status(400).json({ message: "Invalid entity type" });
    }
    // Kiểm tra nếu người dùng đã like post hoặc comment
    if (entity.likes.includes(userId)) {
      // Nếu đã like thì bỏ like
      entity.likes = entity.likes.filter(id => id.toString() !== userId);
      await entity.save();
      return res.status(200).json({ message: `Unliked ${type}`, likes: entity.likes.length });
    } else {
      // Nếu chưa like thì thêm like
      entity.likes.push(userId);
      await entity.save();
      return res.status(200).json({ message: `Liked ${type}`, likes: entity.likes.length });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
// PUT viewpost
export const viewPost =async (req,res)=>{
  const { postId } = req.params;
  const {userId }= req.body.user; 
  try {
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (!post.viewers.includes(userId)) {
      post.viewers.push(userId);
      post.views += 1;
      await post.save();
    }
    return res.status(200).json({ message: "View updated", views: post.views });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
}
//handle post
export const  updatePost= async(req,res)=>{
  try {
    const { postId } = req.params; // Lấy postId từ URL
    const { description, image, visibility, specifiedUsers } = req.body; // Lấy thông tin từ body

    // Kiểm tra xem bài viết có tồn tại không
    const post = await Posts.findById(postId);
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found."
      });
    }

    // Cập nhật các trường thông tin
    post.description = description !== undefined ? description : post.description; // Cập nhật nếu có giá trị mới
    post.image = image !== undefined ? image : post.image; // Cập nhật nếu có giá trị mới
    post.visibility = visibility !== undefined ? visibility : post.visibility; // Cập nhật nếu có giá trị mới
    post.specifiedUsers = specifiedUsers !== undefined ? specifiedUsers : post.specifiedUsers; // Cập nhật nếu có giá trị mới

    // Lưu các thay đổi
    await post.save();

    // Trả về phản hồi thành công
    return res.status(200).json({
      status: "success",
      message: "Post updated successfully!",
      post
    });
  } catch (err) {
    console.error("Error updating post:", err); // Ghi log lỗi để dễ theo dõi
    return res.status(500).json({
      status: "fail",
      message: "Server error. Unable to update the post.",
      error: err.message // Có thể bao gồm thông báo lỗi
    });
  }
}
export const getPost= async(req,res)=>{
  try {
    const { postId } = req.params; 
    const post = await Posts.findById(postId).populate("userId", "-password");
    if (!post) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found."
      });
    }
    return res.status(200).json({
      status: "success",
      post: post
    });
  } catch (err) {
    console.error("Error fetching post:", err);
    return res.status(500).json({
      status: "fail",
      message: "Server error. Unable to fetch the post.",
      error: err.message
    });
  }
}
// tim kiem post  dua theo userId : neu tham so ton thi tim kiem theo tham so  nguoc lai
//thi tim kiem bai post theo user dang dang nhap
export const getUserPost= async(req,res)=>{
  try {
    // Lấy userId từ tham số đường dẫn hoặc từ req.body.user
    const userId = req.params.userId || req.body.user?.userId;
    console.log( req.body.user?.userId)
    // Kiểm tra xem userId có tồn tại không
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "Missing userId. Please provide userId either as a path parameter or in the request body."
      });
    }

    // // Tìm tất cả các bài post của người dùng với userId tương ứng
    const posts = await Posts.find({ userId });

    // Kiểm tra xem có bài post nào không
    if (posts.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found or has no posts."
      });
    }

    // Trả về danh sách bài post
    return res.status(200).json({
      status: "success",
      posts
    });
  } catch (err) {
    console.error("Error fetching user posts:", err);
    return res.status(500).json({
      status: "fail",
      message: "Server error. Unable to fetch posts.",
      error: err.message
    });
  }
}
// POST createPost
export const createPost = async (req, res) => {
  try {
    const { user } = req.body;
    const { description, image, likes, comments, visibility, specifiedUsers, viewers } = req.body;
    console.log(user)
    if (!user || !user.userId || !description || !visibility) {
      return res.status(400).json({
        status: "fail",
        message: "Missing required fields: userId, description, or visibility."
      });
    }
    const newPost = new Posts({
      userId: user.userId,
      description: description,
      image: image || "",
      likes: likes || [],
      comments: comments || [],
      visibility: visibility,
      specifiedUsers: specifiedUsers || [],
      viewers: viewers || []
    });

    await newPost.save();
    return res.status(201).json({
      status: "success",
      message: "Post created successfully!",
      post: newPost
    });
  } catch (err) {
    console.error("Error creating post:", err); // More detailed logging
    return res.status(500).json({
      status: "fail",
      message: "Server error. Unable to create the post.",
      error: err.message // Optionally include error message
    });
  }
}
// DELETE deletePost
export const deletePost  = async(req,res)=>{
  try {
    // Lấy postId từ tham số URL
    const { postId } = req.params;
    // Tìm và xóa bài viết theo postId
    const deletedPost = await Posts.findByIdAndDelete(postId);
    // Kiểm tra xem bài viết có được tìm thấy và xóa hay không
    if (!deletedPost) {
      return res.status(404).json({
        status: "fail",
        message: "Post not found."
      });
    }

    // Trả về phản hồi thành công
    return res.status(200).json({
      status: "success",
      message: "Post deleted successfully!",
      post: deletedPost // Bạn có thể trả về bài viết đã bị xóa nếu cần
    });
  } catch (err) {
    console.error("Error deleting post:", err); // Ghi lại lỗi
    return res.status(500).json({
      status: "fail",
      message: "Server error. Unable to delete the post.",
      error: err.message // Tùy chọn bao gồm thông báo lỗi
    });
  }
}
