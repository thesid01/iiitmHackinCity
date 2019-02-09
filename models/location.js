var mongoose = require("mongoose")
var userschema=new mongoose.Schema({
  	zip:Number,
    rating:Number,
    ratedby:Number,
    totalrated:Number,
    totalrating:Number,
  	personalhygeine:Number,
  	drinkingwater:Number,
  	garbagecontrol:Number,
  	healthfacility:Number,
    publicinfrastructure: Number
 });

var location= mongoose.model("location",userschema);//will pluralise


module.exports=location
