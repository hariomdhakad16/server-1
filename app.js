const express = require('express')
// console.log(express)
const app=express()
const port =3000
const web = require('./routes/web')
const connectDB=require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require("dotenv").config();

app.use(
    cors({
        origin:"https://exactcourse.netlify.app",
        credentials:true,
    })
)

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

