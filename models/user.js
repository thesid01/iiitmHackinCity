var mongoose = require("mongoose")
var userschema=new mongoose.Schema({
  name:String,
  img:String,
  description:String,
  contact : String,
  location:{
  	state:String,
  	country:String,
  	zip:Number
  }
 });

var user= mongoose.model("user",userschema);//will pluralise


module.exports=user;