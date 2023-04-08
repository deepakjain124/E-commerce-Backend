const express=require("express")
const { getallProduct, AddToCart, getCartData, filterProduct, searchProduct, createProduct } = require("../Controller/productcontroller")
const productRouter=express.Router()

productRouter.get("/getproduct",getallProduct)
productRouter.post("/addtocart",AddToCart)
productRouter.get("/getcartdata",getCartData)
productRouter.get("/filterproduct",filterProduct)
productRouter.get("/searchproduct",searchProduct)
productRouter.post("/createproduct",createProduct)



module.exports= productRouter