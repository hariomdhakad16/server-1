const TeacherModel=require('../models/teacher')

class TeacherController{
    static display=async(req,res)=>{
        try{
            res.send("hello display")
        }catch(error){
            console.log(error)
        }
    }
    static create = async(req,res)=>{
        try{
            // console.log(req.body)
            const {name,email,city}=req.body
            const data = await TeacherModel.create({
                name,
                email,
                city
            })
            res.json(data)
        } catch(error){
            console.log(error)
        }

    }
    static view = async(req,res)=>{
        try{
            const id = req.params.id
            const {name,email,city}=req.body
            const data = await TeacherModel.findById(id)
            res.json(data)
        } catch(error){
            console.log(error)
        }

    }

    static update = async(req,res)=>{
        try{
            const id = req.params.id
            const{name,email,city}=req.body
            const date = await TeacherModel.findByIdAndUpdate(id,{
                name,email,city
            })
            res.json({
                msg:"updated"})
        }catch(error){
            console.log(error)
        }
    }
    static delete = async(req,res)=>{
        try{
            const id = req.params.id
            const{name,email,city}=req.body
            const date = await TeacherModel.findByIdAndDelete(id,{
                name,email,city
            })
            res.json({
                msg:"deleted"})
        }catch(error){
            console.log(error)
        }
    }

    

}

module.exports = TeacherController