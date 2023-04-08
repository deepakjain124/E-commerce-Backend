const express=require("express")
const { profileUpdate, userProfile } = require("../Controller/profileController")
const profileRouter=express.Router()

profileRouter.get("/profile",userProfile)
profileRouter.post("/profile/update",profileUpdate)

module.exports= profileRouter