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
  return JWT.sign({
    userId: id
  },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d"
    }
  )
}
export function calculatePostTime(postTimestamp) {
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