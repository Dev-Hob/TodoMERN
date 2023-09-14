const bcrypt = require("bcryptjs");
const Users = require("../models/Users.models.js")
const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");


// user creation
const register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        if(!password || !username || !email) {
            const error = createError(401, "Required fields: username, password, email!")
            return next(error)
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new Users({
            ...req.body,
            password: hash
        })
        await newUser.save()
        res.status(201).send("User has been created!")
    } catch (err) {
        next(err)
    }
}

// user authentication / login
const login = async (req, res, next) => {
    console.log("Auth login called")
    try {
        if(!req.body.username || !req.body.password) {
            const error = createError(401, "Required fields: username, password!")
            return next(error)
        }
        const user = await Users.findOne({username: req.body.username})
        if(!user) return next(createError(404, "User not found"))
        
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
             user.password
             );
        if(!isPasswordCorrect) 
        return next(createError(400, "Wrong password or username!"));
        
        const token = jwt.sign({uid: user._id}, process.env.JWT_secret)
        
        const {password, __v, ...otherDetails} = user._doc;
        console.log("other details ", otherDetails)
        res.cookie("access_token", token, {
            path: '/',
            sameSite: 'none',
            secure: true
        }).status(200).json({details: {...otherDetails}})
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const logout = async (req, res) => {
    console.log("Auth logout called")
    console.log(req.cookie)
    res.cookie('access_token', '')
}

module.exports = { login, register }