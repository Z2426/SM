import Users from '../models/userModel.js'
import { compareString, hashString, createJWT } from '../untils/index.js'
import { sendVerificationEmail } from '../untils/sendEmail.js'
import { recordActivity } from "../controller/historyActivityController.js"
export const register = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body
    if (!(firstName || lastName || email || password)) {
        next("Provide required filed!")
        return
    }
    try {
        const userExist = await Users.findOne({ email })
        if (userExist) {
            next("Email adress already exists")
            return
        }
        const hashedPassowrd = await hashString(password)
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassowrd
        })
        sendVerificationEmail(user, res)

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: e.message })
    }

}
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            s
            res.status(400).json({
                success: false,
                message: "Please Provide User credentials",
                status: "failed"
            });
            return;
        }

        const user = await Users.findOne({ email }).select('+password').populate({
            path: "friends",
            select: "firstName lastName location profileUrl -password"
        });

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
            return;
        }

        if (!user.verified) {
            res.status(403).json({
                success: false,
                message: "User email is not verified. Check your email account and verify your email",
                status: "failed"
            });
            return;
        }
        const isMatch = await compareString(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
            return;
        }
        user.password = undefined;
        const type = "login"
        const message = `${user.firstName} ${user.lastName} login  `
        recordActivity(user._id, type, message)
        const token = createJWT(user._id);
        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
            status: "success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}
export const checkAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please Provide User credentials",
                status: "failed"
            });
            return;
        }
        const user = await Users.findOne({ email })
        if (!user) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
            return;
        }

        if (!user.verified) {
            res.status(403).json({
                success: false,
                message: "User email is not verified. Check your email account and verify your email",
                status: "failed"
            });
            return;
        }

        const isMatch = await compareString(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
            return;
        }

        user.password = undefined;
        const token = createJWT(user._id);
        res.status(201).json({
            success: true,
            message: "Login successfully",
            user,
            token,
            status: "success"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
            status: "failed"
        });
    }
}
