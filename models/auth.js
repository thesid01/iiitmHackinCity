var mongoose = require("mongoose");
var passportlocalmongoose =require("passport-local-mongoose")
var authschema=new mongoose.Schema({
	username:String,
	password:String,
	location_state:String,
	location_country:String,
	location_zip:Number,
	location_city:String,
	ratings :{
		personalhygeine:Number,
		drinkingwater:Number,
		garbagecontrol:Number,
		healthfacility:Number,
		publicinfrastructure:Number,
	},
	rated:Number,
})
authschema.plugin(passportlocalmongoose);

module.exports=mongoose.model("auth",authschema);
