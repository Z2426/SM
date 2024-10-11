import Users from '../models/userModel.js'
import { compareString, hashString, createJWT } from '../untils/index.js'
import { sendVerificationEmail } from '../untils/sendEmail.js'
export const register = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Provide all required fields!" });
    }
    try {
        const userExist = await Users.findOne({ email });
        if (userExist) {
            return res.status(409).json({ message: "Email address already exists." });
        }
        const hashedPassword = await hashString(password);
        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        await sendVerificationEmail(user); 
        return res.status(201).json({ message: "User registered successfully. Please check your email for verification." });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide user credentials",
            status: "failed"
        });
    }
    try {
        const user = await Users.findOne({ email })
            .select('+password')
            .populate({
                path: "friends",
                select: "firstName lastName location profileUrl "
            });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
        }
        if (!user.verified) {
            return res.status(403).json({
                success: false,
                message: "User email is not verified. Check your email account and verify your email",
                status: "failed"
            });
        }
        const isMatch = await compareString(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
                status: "failed"
            });
        }
        user.password = undefined;
        const token = createJWT(user._id);
        return res.status(200).json({
            success: true,
            message: "Login successfully",
            user,
            token,
            status: "success"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error.",
            status: "failed"
        });
    }
};
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
