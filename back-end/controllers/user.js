const createError = require("../utils/error");
const jwt = require("jsonwebtoken")
const ObjectId = require("mongoose").Types.ObjectId;


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("cookies : ", token)
    if(!token){
        return next(createError(401, "you are not authenticated!"))
    }
    
    jwt.verify(token, process.env.JWT_secret, (err, user) => {
        if (err) return next(createError(403, "Token not valid!"));
        user.uid = new ObjectId(user.uid)
        req.user = user;
        next()
    })
}

const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id){
            next()
        } else{
            return next(createError(403, "You are not authorized!"))
        }
    })
}

module.exports = {verifyToken, verifyUser}