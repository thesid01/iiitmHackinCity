var express= require("express")
var router = express.Router({mergeParams:true});
var auth=require("../models/auth.js")
var comment=require("../models/comment.js")
var post=require("../models/post.js")

var middleware=require("../middleware")

// router.get("/girls/:id/comments/new" ,middleware.checklogin, function(req,res){
//   res.render("newcomment.ejs",{id :req.params.id});
// });


router.post("/post/:id/comment" ,middleware.checklogin,function(req,res){
  var newentry ={content:req.body.content };
  comment.create(newentry,function(err,newcomment){
    post.findById(req.params.id,function(err,data){
      if(err){
        console.log(err)
      }else{
        // console.log(req.user)
        newcomment.author.id= req.user._id;
        newcomment.author.username=req.user.username;
        newcomment.save();
        data.comments.push(newcomment);
        data.save();
        res.redirect("/post")
        // res.redirect("/girls/"+req.params.id)
      }
    })
  })
});

// router.get("/girls/:id/comments/:comment_id/edit",middleware.checkcommentcreator,function(req,res){
//   comment.findById(req.params.comment_id,function(err,data){
//     if(err){
//       console.log(err);
//       res.redirect("back")
//     }else{
//       res.render("editcomment",{girl_id:req.params.id,editcomment : data})
//     }
//   })
// })

// router.put("/girls/:id/comments/:comment_id",middleware.checkcommentcreator,function(req,res){
//   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,data){
//     if(err){
//       res.send("sorry bro");

//     }else{
//       req.flash("success","Comment edited successfully!")
//       res.redirect("/girls/"+req.params.id)
// live   })
// })


// router.delete("/girls/:id/comments/:comment_id",middleware.checkcommentcreator,function(req,res){
//   comment.findByIdAndRemove(req.params.comment_id,function(err,data){
//     if(err){
//       console.log(err)
//     }else{
//       req.flash("success","Comment deleted successfully!")
//       res.redirect("/girls/"+req.params.id)
//     }
//   })
// })




// function isloggedin(req,res,next){
//   if(req.isAuthenticated()){
//      next();
//   }else{
//   res.redirect("/login");
// }}

module.exports=router;
