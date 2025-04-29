const bcrypt = require('bcryptjs');
const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');

const registerUserController = async(req, res) => {
    try {
        const { userName, email, password } = req.body;
        console.log(userName, email, password);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ userName: userName, email: email, password: hashedPassword });
        if (newUser) {
            res.status(201).json({
                success: true,
                message: "Registration Successfull !"
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to register"
            })
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Something Went Wrong"
        });
    }
}


const loginUserController = async(req, res) => {
    try {
        const { userName, password } = req.body;
        const matchedUser = await User.findOne({ userName: userName });
        if (matchedUser) {
            const checkedPassword = await bcrypt.compare(password, matchedUser.password);
            console.log(checkedPassword)
            if (checkedPassword) {
                const token = jwt.sign({
                    id: matchedUser._id,
                    role: matchedUser.role,
                    email: matchedUser.email
                }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" })
                res.status(200).cookie('token', token, { httpOnly: true, secure: false }).json({
                    success: true,
                    message: "User Logged In",
                    user: {
                        id: matchedUser._id,
                        email: matchedUser._id,
                        role: matchedUser.role,
                        userName: matchedUser.userName
                    }
                })
            } else {
                res.status(400).json({
                    success: false,
                    message: "Invalid Password"
                })
            }
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid UserName"
            })
        }

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: true,
            message: "Something Went Wrong"
        })
    }
}

const logoutController = async(req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged Out Successfully"
    })
}

const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }
}

module.exports = { registerUserController, loginUserController, logoutController, authMiddleware };