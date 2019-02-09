var express = require("express");
var app = express();
var bodyparser= require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
var request =require('request');

// var methodoverride=require("method-override");
var flash=require("connect-flash");
//app.use("view engine","ejs");
app.use(flash());
var ip = require('ip');

// app.use(methodoverride("_method"));
app.use(express.static("public"));
var mongoose=require("mongoose");
mongoose.connect("mongodb://sid:sid123@ds127825.mlab.com:27825/hack", { useNewUrlParser: true });
mongoose.connection.on('error',function(error){
  console.error("tejendra",error);
});
mongoose.connection.once("open",function(){
  console.log("connected TEZ  *************************************************");
});
var auth=require("./models/auth.js")
var post=require("./models/post.js");
var comment =require("./models/comment.js")
var passport=require("passport")
var localstrategy=require("passport-local")
// var seed=require("./seed")

var postsroutes= require("./routes/posts.js")
var commentroutes= require("./routes/comments.js")
var authroutes= require("./routes/auth.js")


// //===========================================================================================================


app.use(require("express-session")({//use to encode and decode the session data
  secret:"i am the iron man",
  resave : false,
  saveUninitialized:false
}))


// //=============================================================================================================

app.use(function(req,res,next){
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
  next();
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(auth.authenticate()));
passport.serializeUser(auth.serializeUser());    // use to serialixe the data of the user
passport.deserializeUser(auth.deserializeUser());



// //============================================================================================================


app.use(function(req, res, next){
  res.locals.currentuser = req.user;
  next();
})


app.use(postsroutes)
app.use(commentroutes)
app.use(authroutes)


// app.listen(3000,function(){
//   console.log("On Tez");
// })
app.listen(process.env.PORT||5000,function(){
  console.log("ON BABY!!!!");
});
