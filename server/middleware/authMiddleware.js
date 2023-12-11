import JWT from "jsonwebtoken"
import Users from "../models/userModel.js"
export const isAdmin =async(req,res,next)=>{
  try {
    const userId =  req.body.user.userId
    const user = await Users.findById(userId)
    if (!user || user.role !== 'Admin') {
      return res.status(403).json({
        status: 'failed',
        message: 'Access denied! Admin privileges required.'
      })
    }
    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({
      status: 'error',
      message: 'Server error!'
    })
  }
}
export const userAuth = async (req, res, next) => {
  console.log(req.body);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({
      status: "failed",
      message: "Authentication failed"
    });
  }
  const token = authHeader?.split(" ")[1];
  try {
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.body.user = {
      userId: userToken.userId,
    };
    const user = await Users.findById(req.body.user.userId)
    if(!user.statusActive){
      return res.status(401).json({
        status: "failed",
        message: "Authentication failed  because account your been block"
      });
    }
    console.log(`authe :${req.body.user.userId} `);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      status: "failed",
      message: "Authentication failed"
    });
  }
};

