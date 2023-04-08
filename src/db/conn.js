const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/userinfo",{
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfull");
}).catch((err)=>{
    console.log("error");
})