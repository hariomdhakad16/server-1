const express = require('express')
// console.log(express)
const app=express()
//const port =3000
const web = require('./routes/web')
const connectDB=require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// ...existing code...
require("dotenv").config();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173", 
  "https://exactcourse.netlify.app",
  // add your Render frontend URL(s) here, e.g.:
  // "https://your-front-end.onrender.com"
];

app.use(
  cors({
    origin: function(origin, callback) {
      // allow non-browser tools (no origin) and allowed origins
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"), false);
    },
    credentials: true,
  })
);

// ...existing code...

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server start at ${port}`));

//token get cookie
app.use(cookieParser())

//image upload
app.use(fileUpload({
    useTempFiles :true,
}));


//database connection
connectDB()
app.use(express.json())


app.use('/api',web)


app.listen(port,console.log("server start at 3000"))

