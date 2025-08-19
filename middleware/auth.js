const jwt = require("jsonwebtoken");
const User = require("../models/user"); // import User model

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token,JWT_SECRET);
    // console.log(decoded)

    // fetch full user from DB
    const user = await User.findById(decoded.ID);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // full user now available including email
    // console.log(req.user)
    next();
  } catch (err) {
    console.log(err)
    res.status(401).json({ message: "Invalid token" });
  }
};




module.exports =isAuthenticated 