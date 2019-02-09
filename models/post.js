var mongoose = require("mongoose")
var postschema=new mongoose.Schema({
  zip:String,
  rating:Number,
  totalrating:Number,
  ratedby:Number,
  img:String,
  caption:String,
  description:String,
  comments : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "comment"
  }],
  author :{
    id :{
      type: mongoose.Schema.Types.ObjectId,
      ref : "auth"
      },
    username: String
}});

var post= mongoose.model("post",postschema);//will pluralise


module.exports=post;
