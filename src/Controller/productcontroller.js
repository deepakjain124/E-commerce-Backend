const Allproducts = require("../models/Product");
const auth = require("../middleware/authorization");
const jwt=require("jsonwebtoken");
const cartdata = require("../models/CartItem");
const dummyproduct = require("../dummyproduct/dummyproduct");
require("../db/conn");

const createProduct=(async(req,res)=>{
    try{
  const product=await new Allproducts(req.body) 
        if(product){
            product.save().then(()=>{
                console.log("hhh");
                res.status(201).send(product)
            }).catch((err)=>{
                console.log(err);
            })
        }
    
  } catch (error) {
    res.status(400).send(error)

  }
  })
  const getallProduct=( async (req, res) => {
    try {
      const allproducts = await Allproducts.find();
      res.status(200).send(allproducts);
    } catch (error) {
      console.log(error);
    }
  });
  const AddToCart=(auth,async(req,res)=>{
    try {
      const addcartdata=await new cartdata(req.body)
      const token = await addcartdata.getauthToken(req.headers);
      const setprodut=await addcartdata.setproductdata(req.body)
      addcartdata.save().then(()=>{
        res.status(201).send(addcartdata)
      }).catch((err)=>{
        console.log(err);
        res.status(400).send(err)
      })
    } catch (error) {
      res.status(400).send(error)
  
    }
  })
 const getCartData=(auth,async(req,res)=>{
    try {
      const gettokenofuser=jwt.verify(req.headers["authorization"],"thisismychannelofdeepakjaincomehere")
      const {_id}=gettokenofuser 
      const cartitems=await cartdata.find({userId:_id})
      res.status(200).send(cartitems)
    } catch (error) {
      console.log(error);
    }
  })
 const searchProduct=(auth,async(req,res)=>{
    try {
     const searchdata=req.query.search
     console.log(searchdata);
     const Products=await Allproducts.find()
     const filter=Products.filter((item)=>item?.name.toLowerCase().includes(searchdata.toLowerCase()))
     if(filter.length!==0){
       res.status(200).send(filter)
     }else{
      res.status(400).send("There is no related data to this name")
     }
    } catch (error) {
      res.status(400).send(error)
    }
  })
 const filterProduct=(auth,async(req,res)=>{
    console.log(req.query);
    const filteruser=jwt.verify(req.headers["authorization"],"thisismychannelofdeepakjaincomehere")
    const filterData=await Allproducts.find({$and:[{amount:{$gte:req.query.min}},{amount:{$lte:req.query.max}}]})
    res.status(200).send(filterData)
  })

  module.exports={filterProduct,getallProduct,AddToCart,searchProduct,getCartData,createProduct}