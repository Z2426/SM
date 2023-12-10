import JWT from "jsonwebtoken"
export const userAuth = async (req, res, next) => {
  console.log(req.body)
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    next("Authentication== failed")
  }
  const token = authHeader?.split(" ")[1]
  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY)
    req.body.user = {
      userId: userToken.userId,
    }
    console.log(`authe :${req.body.user.userId} `)
    next()
  } catch (error) {
    console.log(error)
    next("Authentication failed")
  }
}
