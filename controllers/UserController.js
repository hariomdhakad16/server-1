const UserModel = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
class UserController {
  static register = async (req, res) => {
    try {
      const { name, email, password } = req.body
      const emailcheck = await UserModel.findOne({ email })
      if (emailcheck) {
        return res.status(400).json({ message: "email already registered" });
      }
      //hash password
      const hashPassword = await bcrypt.hash(password, 10)
      console.log(password)
      const data = await UserModel.create({
        name,
        email,
        password: hashPassword
      })
      res.json({
        data,
        msg: "user register success"
      })
      // console.log(req.body)
    } catch (error) {
      console.log(error)
    }
  }
  static login = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      //console.log(user)
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: " Invalid credentials " });
      }
      //console.log(isMatch)
      //token create
      const token = jwt.sign(
        { ID: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "2d" } //2 din me token expire ho jayega
      );
      //  console.log(token)

      // Send token in HTTP-Only cookie
      // Inside login controller
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // ✅ required for HTTPS (Render + Netlify are HTTPS)
        sameSite: "None", // ✅ required for cross-site cookies
        maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
      });

      res.status(200).json({
        message: "Login successful",
        role: user.role,
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error", error });
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie('token')
      res.status(200).json({ message: "logout succesfully" })
    } catch (error) {

    }
  }

  // static changepassword = async(req,res)=>{

  // }

}

module.exports = UserController
