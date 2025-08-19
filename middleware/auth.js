const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")
const checkAuth = async (req,res,next)=>{
    const token = req.cookies.token
    // console.log(token)
    if (!token) return res.status(401).json(
        {message:'unauthorised'}
    ); 
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
        
        //fetch full user from db
        const user =await UserModel.findById(decoded.ID)
        if(!user) return res.status(401).json({message:"user not found"})
        
        req.user=user;
        // console.log(user)
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({message:"Invalid token"})
    }
}

module.exports = checkAuth