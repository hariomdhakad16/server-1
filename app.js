const express = require('express')
require("dotenv").config();
// console.log(express)
const app=express()
const web = require('./routes/web')
const connectDB=require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')



app.use(
  cors({
    origin: "https://exactcourse.netlify.app", // no trailing slash
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // allow cookies
  })
);

//token get cookie
app.use(cookieParser())

//database connection
connectDB()
app.use(express.json())

//image upload
app.use(fileUpload({
    useTempFiles :true,
}));


app.use('/api',web)

// server start
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`✅ Server running on http://localhost:${port}`));
