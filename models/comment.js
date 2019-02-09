var mongoose= require("mongoose")
var commentschema = new mongoose.Schema({
	content: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref : "auth"
		},
		username: String
	}

})

var comment =mongoose.model("comment",commentschema)

module.exports = comment; 