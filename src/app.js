const express =require("express");
const app =express();
const path =require("path");
const hbs =require("hbs");
const LocalStrategy=require('passport-local').Strategy;
require("./db/conn");
const bcrypt = require("bcryptjs");
const Register = require("./models/registers");
const port=process.env.PORT || 3000; // for globl access
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");


//passsport
const session=require("express-session");
const passport=require("passport");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false,maxAge:60000 }
  }));
 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username,password);
        Register.findOne({ email: username }, function (err, user) {
            //console.log(user.email,user.password);
        if (err) { return done(err); }
        if (!user) { return done(null, false,{message:'invalid user'}); }
        if (!user.password==password) { return done(null, false,{message:'invalid user'}); }
        return done(null, user);
        
        
      });
    }
  ));
  passport.serializeUser((user,done)=>{
    if(user){
        return done(null,user.id)
    }
    return done(null,false);
  });
  passport.deserializeUser((id,done)=>{
    Register.findById(id,(err,user)=>{
        if(err) return done(null,false);
        return done(null,user);
    })
  });
app.use(express.json());
app.use(express.urlencoded({extended:false}));


//
app.use(express.static(static_path))
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/" ,(req , res)=>{
res.render("Account");
})

app.get("/Account" ,(req , res)=>{
    res.render("Account");
    })
//res.send("hello from the suryawebsoft technology")
app.get("/Task" ,(req , res)=>{
    res.render("Task");
    })
app.get("/Login",(req,res)=>{
    res.render("Account");
})


// create new user in our data base
app.post("/Account", async (req,res,done)=>{
    try{
        // password hashing
         let pasd=req.body.password;
         async function securePass(pass)
         {
             const sp=await bcrypt.hash(pass,10);
             
             return sp;
         }
       const seqpas=await securePass(pasd);
  
       Register.findOne({email:req.body.username},(err,user)=>{
        if(err)done(null,false);
        else if(user) res.send("User Already registered");
        else{
            Register.create({
                name :req.body.name,
                email :req.body.username,
                mobile :req.body.mobile,
                password : seqpas
            }
        )
        res.send("User  registered");
        }
       })
    }
    catch(error){
        res.status(400).send("error");
    }
});
app.get("/test",(req,res)=>{
    req.session.test ? req.session.test++:req.session.test=1;
    res.send(req.session.test.toString()+" "+req.user);
})
app.post("/logout",(req,res)=>{
    req.logout();
    res.send("logged out");
})
app.post("/Login", 
  passport.authenticate('local'),
  function(req, res) {
    res.send('<p>Login Success</p>');
  });

app.listen( port,()=>{
    console.log(`server is running at port no ${port}`);
})

//




