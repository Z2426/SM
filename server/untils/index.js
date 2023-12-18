import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
export const hashString = async (useValue) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassorwd = await bcrypt.hash(useValue, salt)
  return hashedPassorwd
}
export const compareString = async (userPassword, password) => {
  const isMatch = await bcrypt.compare(userPassword, password)
  return isMatch
}
//JSON WEBTOKEN
export function createJWT(id) {
  const sixMonthsInSeconds = 6 * 30 * 24 * 60 * 60; // Số giây trong 6 tháng

  const token = JWT.sign(
    {
      userId: id,
      exp: Math.floor(Date.now() / 1000) + sixMonthsInSeconds, // Thời gian hết hạn: 6 tháng
    },
    process.env.JWT_SECRET_KEY
  );
  return token;
}
export function calculatesTime(postTimestamp) {
  const now = new Date() // Thời gian hiện tại
  const postDate = new Date(postTimestamp) // Thời gian đăng bài post
  const timeDifference = now.getTime() - postDate.getTime() // Độ chênh lệch thời gian
  // Chuyển đổi đơn vị từ milliseconds sang giờ, ngày, tháng
  const millisecondsPerHour = 1000 * 60 * 60
  const millisecondsPerDay = millisecondsPerHour * 24
  const millisecondsPerMonth = millisecondsPerDay * 30
  if (timeDifference < millisecondsPerHour) {
    const minutes = Math.floor(timeDifference / (1000 * 60));
    return `${minutes} phút trước`
  } else if (timeDifference < millisecondsPerDay) {
    const hours = Math.floor(timeDifference / millisecondsPerHour);
    return `${hours} giờ trước`
  } else if (timeDifference < millisecondsPerMonth) {
    const days = Math.floor(timeDifference / millisecondsPerDay);
    return `${days} ngày trước`
  } else {
    const postDay = postDate.getDate()
    const postMonth = postDate.getMonth() + 1
    const postYear = postDate.getFullYear()
    return `${postDay}/${postMonth}/${postYear}`
  }
}
export function isValidEmail(email) {
  // Biểu thức chính quy để kiểm tra địa chỉ email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}