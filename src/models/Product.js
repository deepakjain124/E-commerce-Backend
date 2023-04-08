const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    minLength: 10,
    required: true,
    trim:true
  },
  amount: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["Small", "Large", "X-large"],
    default: "Small",
  },
  color: {
    type: String,
  },
  category: {
    type: String,
    enum: ["Male", "Female", "Others"],
    default: "Male",
  },
  created_at: { type: Date }

});
ProductSchema.pre('save', function(next) {
    this.created_at = Date.now();
    next();
  });
const products = new mongoose.model("product", ProductSchema);

module.exports = products;
