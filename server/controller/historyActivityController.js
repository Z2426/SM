import  historyActivity from "../models/historyActivityModel.js"
export const recordActivity = async (userId,type,message) => {
    try {
      const newActivity = new historyActivity({
        userId,
        type, 
        message, 
      });
      const savedActivity = await newActivity.save();
      console.log('Activity recorded:', savedActivity);
    } catch (error) {
      console.error('Failed to record activity:', error);
    }
  }
export const historyActivityOfUser = async (req, res) => {
    try {
      const { userId } = req.params; 
  
      const userActivities = await historyActivity
        .find({ userId })
        .sort({ createdAt: -1 }) 
  
      const Activities = userActivities.map((activity) => {
        const date = new Date(activity.createdAt);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; 
        const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
  
        return {
          ...activity.toObject(),
          formattedDate,
          formattedTime,
        };
      });
  
      res.json({ Activities }); // Trả về JSON chứa formattedActivities
    } catch (error) {
      console.error('Failed to get user activities:', error);
      res.status(500).json({ error: 'Failed to get user activities' }); // Trả về JSON thông báo lỗi nếu có lỗi xảy ra
    }
  };
  