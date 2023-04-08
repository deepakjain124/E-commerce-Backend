const express=require("express")
const { getAllusers, RegisterUSer, LoginUser, tokenRefresh, passwordChange } = require("../Controller/userController")
const userRouter=express.Router()

userRouter.get("/",getAllusers)
userRouter.post("/register",RegisterUSer)
userRouter.post("/login",LoginUser)
userRouter.post("/token",tokenRefresh)
userRouter.post("/changepassword",passwordChange)


module.exports= userRouter