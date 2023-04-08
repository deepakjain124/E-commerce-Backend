const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Allproducts = require("../models/Product");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  ProductId: {
    type: String,
  },
  qty: {
    type: Number,
  },
  products:{
    type:Object
  }
});

cartSchema.methods.getauthToken = async function (data) {
  try {
    const authHeader = data["authorization"];
    const verifyuser = jwt.verify(
      authHeader,
      "thisismychannelofdeepakjaincomehere"
    );
    console.log(verifyuser);
    this.userId = verifyuser._id;
    this.ProductId === undefined;
    await this.save();
  } catch (error) {
    console.log(error);
  }
};
cartSchema.methods.setproductdata = async function (data) {
    try {
     const getproductdata=await Allproducts?.find({_id:data?.ProductId})
     this.products=getproductdata[0]
     this.ProductId=undefined
      await this.save();
    } catch (error) {
      console.log(error);
    }
  };

const cartdata = new mongoose.model("cart", cartSchema);
module.exports = cartdata;
