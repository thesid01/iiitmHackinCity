var express= require("express")
var router = express.Router({mergeParams:true});
var post=require("../models/post.js")
// var comment=require("../models/comment.js")
var middleware=require("../middleware")

router.get("/", function(req,res){
  res.render("register")  ;
});


// //post page
router.get("/post",middleware.checklogin, function(req,res){
  post.find({ }).populate("comments").exec(function(err,data){
    // console.log(req.user)
    if(err){
      console.log(err)
    }
    else{
      // console.log(data);
      res.render("home.ejs", {posts : data});
    }
  })
 });

router.post("/post",middleware.checklogin,function(req,res){
  var newcaption=req.body.newcaption;
  var image=req.body.image;
  // var  newimg= req.body.newimg;
  var description=req.body.newdescription;
  var zip=req.user.location_zip;
  var rating=0;
  var ratedby=0;
  var totalrating=0;
  var newentry ={caption:newcaption ,img:image, description:description,zip:zip,rating:rating,ratedby:ratedby,totalrating:totalrating};
  post.create(newentry,function(err,newa){
    if(err){
      console.log(" fuck!!!")
    }
    else{
      // console.log(req.user)
      newa.author.id=req.user._id;
      newa.author.username=req.user.username;
      newa.save();
      // console.log(newentry);
      res.redirect("/post");
    }
  }

)});

router.post("/rate",middleware.checklogin,function(req,res){
    post.findById(req.body.idd,function(err,data){
      if(err){
        console.log(err)
      }else{
        data.totalrating= data.totalrating+ parseInt(req.body.rating);
        data.ratedby=data.ratedby+1;
        data.rating=data.totalrating/data.ratedby;
        data.save();
        // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^")
        // console.log(data);
        res.redirect("/post")
      }
    })
});

// router.get("/girls/new" ,middleware.checklogin,function(req,res){
//   girl.findById(req.params.id,function(err,foundgirl){
//     if(err){
//       console.log(err)
//     }else{
//     res.render("new",{foundgirl:girl});

//     }
//   })
// });

// router.get("/girls/:id/edit",middleware.checkpostcreator,function(req,res){
//    girl.findById(req.params.id,function(err,data){
//     if(err){
//       console.log(err);
//       res.redirect("/girls")
//     }else{
//       res.render("edit",{foundgirl:data})
//     }
//    })
// })

// router.put("/girls/:id",middleware.checkpostcreator,function(req,res){
//   // console.log(updategirl);
//   girl.findByIdAndUpdate(req.params.id,req.body.updategirl,function(err,data){
//     console.log(data);

//     if(err){
//       console.log(err);
//       res.redirect("/girls/"+req.param.id+"/edit")
//     }else{

//       req.flash("success","post edited successfully!")
//       res.redirect("/girls/"+ req.params.id)
//     }
//   })
// })
// router.delete("/girls/:id",middleware.checkpostcreator,function(req,res){
//   // console.log(updategirl);
//   girl.findByIdAndRemove(req.params.id,function(err,data){
//     if(err){
//       console.log(err);
//       res.redirect("/girls/"+req.param.id)
//     }else{
//         req.flash("success","Post deleted successfully!")
//         res.redirect("/girls")
//     }
//   })
// })


// router.get("/girls/:i",function(req,res){
//   girl.findById(req.params.i).populate("comments").exec(function(err,data){
//     if(err){
//       console.log(err)
//     }else{
//       res.render("show.ejs",{foundgirl: data});
//     }
//   })
// })

//================================================================================
router.get("/register",function(req,res){
  res.render("register.ejs");
})

router.get("/home",function(req,res){
  res.render("home.ejs")
})

module.exports= router;
