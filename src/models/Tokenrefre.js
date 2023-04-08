const mongoose=require("mongoose")

const tokenrefreshschema=new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true,
        trim:true
    }
})

const tokendata=new mongoose.model("refreshtoken",tokenrefreshschema)
module.exports=tokendata