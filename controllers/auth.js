const User = require('../models/User')
const Cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')
const register = async (req,res) => {
    const {username, email, password} = req.body;
    if(!username || !password || !email)
    {
        return res.status(400).json({
            success: false,
            msg: "Please enter valid username, email and password"
        })
    }
    const newPassword = Cryptojs.AES.encrypt(password, process.env.PASS_SEC).toString()

    try {
        const newUser = await User.create({...req.body,password: newPassword}) 
        const {password, ...others} = newUser._doc
        res.status(201).json({
            success: true,
            msg: "User registered successfully",
            user: others,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            msg: "Error occured registering the user. Please try again later.",
        })
    }
}


const login = async (req,res)=> {
    const {username, password} = req.body;
    if(!username || !password)
    {
        return res.status(400).json({
            success: false,
            msg: "You must enter your Username and Password",
        })
    }
    const user = await User.findOne({username});
    if(!user)
    {
        return res.status(400).json({
            success: false,
            msg: "Invalid username",
        })
    }
    const userPass = Cryptojs.AES.decrypt(user.password, process.env.PASS_SEC).toString(Cryptojs.enc.Utf8);
    if(userPass == password)
    {
        const token = await jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SEC,
        {expiresIn: "2d"})

        const {password, ...others} = user._doc
        return res.status(200).json({
            success: true,
            msg: "User logged in successfully",
            user: others,
            accessToken: token,
        })
    }

    res.status(400).json({
        success: false,
        msg: "Invalid Password",
    })
}


module.exports = {
    register,
    login,
}