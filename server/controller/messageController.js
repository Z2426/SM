import conversation from "../models/conversationsModel.js"
import message from "../models/messageModel.js"
import Users from "../models/userModel.js"
// create conservation
export const createConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;

  try {
    const existingConversation = await conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existingConversation) {
      return res.status(200).json(existingConversation); // Trả về cuộc trò chuyện đã tồn tại
    }

    const newConversation = new conversation({
      members: [senderId, receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation); // Trả về cuộc trò chuyện mới nếu chưa tồn tại
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// get all conservation
export const getUserConversations = async (req, res) => {
  const userId = req.params.userId;

  try {
    const conversations = await conversation.find({ members: userId });
    const uniqueUserIds = [...new Set(conversations.map(conv => conv.members).flat())];
    const membersDetails = await Users.find({ _id: { $in: uniqueUserIds, $ne: userId } })
      .select('-password firstName lastName email profileUrl');
    const membersMap = {};
    membersDetails.forEach(member => {
      membersMap[member._id] = member;
    });
    const conversationsWithMembersInfo = conversations.map(conv => ({
      _id: conv._id,
      members: conv.members.map(memberId => membersMap[memberId]).filter(Boolean) // Lọc bỏ thành viên có giá trị null
    }));

    res.status(200).json(conversationsWithMembersInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// send message
export const sendMessage = async (req, res) => {
  const { conversationId, sender, text } = req.body;
  const newMessage = new message({
    conversationId,
    sender,
    text,
  });

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// get  all message in conservation
export const getMessagesInConversationSortedByTime = async (req, res) => {
  const conversationId = req.params.conversationId;
  try {
    const messages = await message.find({ conversationId }).sort({ createdAt: 1 });
    const messagesWithUserInfo = await Promise.all(messages.map(async (msg) => {
      // Tìm thông tin chi tiết của người gửi từ bảng người dùng
      const senderDetails = await Users.findById(msg.sender).select('-password firstName lastName email profileUrl');

      // Tạo một đối tượng mới chứa thông tin tin nhắn và thông tin chi tiết của người gửi
      const messageWithUser = {
        ...msg.toJSON(), // Chuyển đổi tin nhắn thành đối tượng JSON và sao chép các thông tin
        infoUser: senderDetails ? senderDetails.toJSON() : null, // Bổ sung thông tin chi tiết của người gửi vào tin nhắn
      };

      return messageWithUser;
    }));
    // Gửi danh sách tin nhắn đã được mở rộng (bao gồm thông tin người gửi) dưới dạng JSON
    res.status(200).json(messagesWithUserInfo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
