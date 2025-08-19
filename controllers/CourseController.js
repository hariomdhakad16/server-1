
const cloudinary = require('cloudinary');
const CourseModel = require('../models/course');

cloudinary.config({ 
        cloud_name: 'dtbgzsliz', 
        api_key: '969228472644248', 
        api_secret: 'uqbyH2nB0IiVpjvrP8OhpM9ipCk' // Click 'View API Keys' above to copy your API secret
    });

class CourseController{
     static display = async(req,res)=>{
        try{
            const data = await CourseModel.find();
            res.json(data)
        }
        catch (error){
            console.log(error); 
        }
    }
    static create = async(req,res)=>{
        try{
            const {title,description,price,duration} = req.body
           const file= req.files.image
           const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{
            folder:"courseImage"
        })
           const data = await CourseModel.create({
            title,
            description,
            price,
            duration,
            image:{
                public_id:imageUpload.public_id,
                url:imageUpload.secure_url
            }
           })
           res.json(data)
        }
        catch (error){
            console.log(error); 
        }
    }
    static view = async(req,res)=>{
        try{
           const id = req.params.id
           const data = await CourseModel.findById(id)
           res.json(data)
        }
        catch (error){
            console.log(error); 
        }
    }
    static update = async(req,res)=>{
        try{
           const id = req.params.id
           const {title,description,price,duration} = req.body
           const data = await CourseModel.findByIdAndUpdate(id,{
            title,
            description,
            price,
            duration
           })
           res.json({
            msg:"update contact success"
           })
        }
        catch (error){
            console.log(error); 
        }
    }
    static delete = async(req,res)=>{
        try{
           const id = req.params.id
           const data = await CourseModel.findByIdAndDelete(id)
           res.json({
            msg:"delete contact success"
           })
        }
        catch (error){
            console.log(error); 
        }
    }
}
module.exports = CourseController