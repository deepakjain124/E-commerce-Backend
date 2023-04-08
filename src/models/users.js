const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jet=require("jsonwebtoken")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
    },
    dob:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword:{
        type:String,
        required:true
    },
    tokens:{
            type:String,
    },
    refreshToken:{
        type:String
    },
    previouspassword:{
        type:String
    },
    newPassword:{
        type:String
    }
})

userSchema.methods.generateAuthToken=async function(){
try {
    const accesstoken=jet.sign({_id:this._id.toString()},"thisismychannelofdeepakjaincomehere",{
        // expiresIn: 120 // it will be expired after 120ms
 })
 const refreshtoken=jet.sign({_id:this._id.toString()},"thisismychannelofdeepakjaincomehererefreshtoken",{
    // expiresIn: 1200 // it will be expired after 120ms
})

    console.log(accesstoken,"gfgf");
    this.tokens=accesstoken
    this.refreshToken=refreshtoken
    // this.confirmpassword=undefined
    await this.save()
    return token
} catch (error) {
    
}
}
userSchema.methods.regenerateToken=async function(id){
    console.log(id);
    try {
        const accesstoken=jet.sign({_id:id.toString()},"thisismychannelofdeepakjaincomehere",{
            // expiresIn: 120 // it will be expired after 120ms
     })
        this.tokens=accesstoken
        await this.save()
        return this
    } catch (error) {
        
    }
    }

userSchema.pre("save",async function(next){
    console.log(this);
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
        this.confirmpassword=await bcrypt.hash(this.password,10)
    }
    next()
})
const userdata=new mongoose.model("userdata",userSchema)
module.exports=userdata