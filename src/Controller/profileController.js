const jwt=require("jsonwebtoken");
const auth = require("../middleware/authorization");
const userdata = require("../models/users");

const userProfile=(auth,async(req,res)=>{
    try {
      const gettokenofuser=jwt.verify(req.headers["authorization"],"thisismychannelofdeepakjaincomehere")
      const {_id}=gettokenofuser 
      let profile=await userdata.find({_id:_id})
      let newdata={...profile[0]._doc}
      delete newdata["tokens"]
      res.status(200).send(newdata)
    } catch (error) {
      console.log(error);
    }
  })
  
  const profileUpdate=(auth,async(req,res)=>{
    try {
      const gettokenofuser=jwt.verify(req.headers["authorization"],"thisismychannelofdeepakjaincomehere")
      const {_id}=gettokenofuser 
      let profile=await userdata.findByIdAndUpdate({_id:_id},{$set:{
        name:req.body.name,
        dob:req.body.dob,
        address:req.body.address,
        phone:req.body.phone
      }},{new:true})
      console.log(profile);
      res.status(200).send(profile)
    } catch (error) {
      console.log(error);
    }
  })
  module.exports={profileUpdate,userProfile}