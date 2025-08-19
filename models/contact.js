const mongoose = require("mongoose");

const ContactSchema = mongoose.Schema({
    name:{
        type:String
    }
}) 

const ContactModel = mongoose.model('contact',ContactSchema)

module.exports = ContactModel