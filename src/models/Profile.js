const mongoose=require("mongoose")

const profileSchema=new mongoose.Schema({
    name:{
        type:String
    },
    dob:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    currentPassword:{
        type:String
    },
    newPassword:{
        type:String
    }
})

const profiledata=new mongoose.model("profile",profileSchema)
module.exports=profiledata