require("dotenv").config()
const express = require("express");
const app = new express();
require("./db/conn");
const router=require("./routers/UserRoute");
const productRouter = require("./routers/ProductRoute");
const profileRouter = require("./routers/profileRoute");
const userRouter = require("./routers/UserRoute");
app.use(express.json());

app.use("/api/auth",userRouter)
app.use("/api/v1",productRouter)
app.use("/api/v1",profileRouter)


 app.listen(8080, () => {
  console.log("connection is set up at 8000");
});
