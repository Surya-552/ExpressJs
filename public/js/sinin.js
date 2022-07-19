app.post("/Login", async (req,res)=>{
    try{
        const UserId=req.body.userId;
        const Pasword=req.body.pass;
       const UserEmail= await Register.findOne({email:UserId});
       if(UserEmail.password===Pasword){
       // // res.status(201).render("home");
       console.log(UserEmail);
    }
        else
       
       res.status(400).send("invalid credential");
       
    }
    catch(error){
        res.status(400).send("invalid credential");
    }
})