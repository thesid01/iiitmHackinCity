var express= require("express")
var router = express.Router();
var passport=require("passport");
var auth =require("../models/auth.js");
var ip = require("ip");
var request = require("request");
var lc = require("../models/location.js");
var middleware=require("../middleware")
 router.get("/register" ,function(req,res){
  res.render("register");
 })

 router.get("/user",middleware.checklogin,function(req,res){
   res.render("user.ejs");
 });

 var ipdata;
 var IP="http://api.ipstack.com/"+"14.139.240.247"+"?access_key=690d1c17324fe9d9c9b27c144913bb67&format=1";
  request(IP, function(err,res,body){
  ipdata=JSON.parse(body);
  // console.log(JSON.parse(body));
  // console.log(ipdata);
});

 router.post("/register",function(req,res){
   var lc1=new lc({
     zip:ipdata.zip,
     rating:0,
     ratedby:0,
     ratedbyform:0,
     totalrating:0,
   	personalhygeine:0,
   	drinkingwater:0,
   	garbagecontrol:0,
   	healthfacility:0
   });
   lc.find({zip:ipdata.zip},function(err,data){
     if(err){
       console.log(err)
     }else{
       if(data.length!==0){

         // console.log(data)
         // console.log("AAAAAAAAAAAAAAAAALLLLLLLLLLLLRRRRRRRRRRRRRRREEEEEEEEEEEEAAAAAAAAAAAAAAAADDDDDDDDDDDDDDYYYYYYYYY")
       }else{
         lc.create(lc1,function(err,data){
           // console.log(data);
         })
       }
     }
   })

    var newuser= new auth({
      username : req.body.username,
      location_state : ipdata['region_name'],
      location_country : ipdata.country_name,
      location_zip : ipdata.zip,
      location_city : ipdata.city,
      rated : 0
    });
    auth.register(newuser,req.body.password,function(err,user){

      // console.log(user);
      if(err){
        console.log(err);
        //res.flash("error",err.message)
        res.redirect("/register")

      }else{
        passport.authenticate("local")(req,res,function(){
          //alert("req.user")
          // req.flash("success","Welcome "+req.user.username)
          res.redirect("/login")
        })
      }
    })
 })


router.get("/login",function(req,res){
    res.render("login")
})

router.post("/login",passport.authenticate("local",{
  successRedirect: "/post",
  failureRedirect:"/login"
}),function(req,res){

});


router.get("/logout",function(req,res){
  req.logout();
  req.flash("success","Logged out!!")
  res.redirect("/login")
})
 //=================================================================================

router.post("/rating", function(req,res){
  var personalhygeine= (req.body.personalhygeine);
  var drinkingwater = (req.body.drinkingwater);
  var garbagecontrol = (req.body.garbagecontrol);
  var healthfacility = (req.body.healthfacility);
  var publicinfrastructure = (req.body.publicinfrastructure);

  console.log(personalhygeine);
  console.log(drinkingwater);
  console.log(garbagecontrol);
  console.log(healthfacility);
  console.log(publicinfrastructure);

  lc.findOneAndUpdate(
    {zip:ipdata.zip},
    {$inc:
      {personalhygeine:personalhygeine,
      drinkingwater:drinkingwater,
      healthfacility:healthfacility,
    garbagecontrol:garbagecontrol,
    publicinfrastructure:publicinfrastructure,
  ratedby:1}
    },
    function(err,data){
    if(err){
      console.log(err);
    }else {
      console.log(data);
    }
  });

  lc.findOneAndUpdate(
    {zip:ipdata.zip},
    {$set:
      {totalrating:(healthfacility+garbagecontrol+drinkingwater+personalhygeine)}
    },function(err,data){
    if(err){
      console.log(err);
    }else {
      console.log(data);
    }
  });

  // lc.findOneAndUpdate( {zip :ipdata.zip} , function(err,data){
  //   if(err){
  //     console.log(err)
  //   }else{
  //     console.log("13131231233333313222222222222222222222222222222222222222222222222222222222222")
  //     data.personalhygeine = parseInt(personalhygeine)+(data.personalhygeine*data.ratedbyform);
  //     data.ratedbyform = data.ratedbyform+1;
  //     data.personalhygeine=data.personalhygeine/data.ratedbyform;
  //     data.save( function(err){
  //       if(err){
  //         console.log(err)
  //       }
  //     });
  //
  //     console.log(data);
  //
  //     console.log("%#$%#%^&^*&%$#$@##$%%$^%$%#$%#$#@$@$@#$@#$@#$@#$@#$@")
  //
  //   }
  // })
  console.log(req.user);
  auth.findById(req.user._id,function(err,data){
    console.log(data)
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
    if(err){
      console.log(err)
    }else{
      data.ratings.personalhygeine=personalhygeine;
      data.ratings.drinkingwater=drinkingwater;
      console.log("feeling")
      data.ratings.garbagecontrol=garbagecontrol;
      data.ratings.healthfacility=healthfacility;
      data.ratings.publicinfrastructure=publicinfrastructure;
      data.rated = 1;
      data.save();

    }
    res.redirect("/post");
  })
})

router.get("/results",function(req,res){
  auth.findById(req.user._id,function(err,data){
    if(err){
      console.log(err)
    }else{
      var region= data.location_zip;
      lc.find({zip: ipdata.zip},function(err,data1){
        console.log("123333333333333333333333333333333333333333333333333333333333333333333333333")
        console.log(data1);
        console.log(region)
        res.render("results.ejs",{datas:data1})

      })
    }
    })})





module.exports= router;
