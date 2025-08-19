const mongoose = require("mongoose");
//const LiveUrl = "mongodb+srv://mrvikashkirar:Dhakadsahab27@cluster0.zohbwxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connectDB = async ()=>{
    return mongoose.connect(process.env.LiveUrl)

    .then(()=>{
        console.log('Database connection succesful')
    })
    .catch((error)=>{
        console.log(error);
    });
};
module.exports = connectDB;