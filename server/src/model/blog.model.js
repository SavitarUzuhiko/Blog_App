const { Schema, model } = require("mongoose");

const BlogModel = new Schema({
  author : {type:Schema.ObjectId , ref:"User"},
  title : {type:String , required : true},
  content : {type:String , required : true},
  image : {type:String }
},{timestamps : true});

module.exports = model("Blog", BlogModel, "blog");