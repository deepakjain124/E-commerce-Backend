const jwt=require("jsonwebtoken")
const userdata=require("../models/users")

const auth=async(req,res,next)=>{
try {
    // if(!true){
    const token=req.cookies.jwt;
    const verifyuser=jwt.verify(token,"thisismychannelofdeepakjaincomehere")

    const user=await userdata.findOne({_id:verifyuser._id})
    next()
    // }
} catch (error) {
    res.status(400).send(error)
}
}

module.exports=auth