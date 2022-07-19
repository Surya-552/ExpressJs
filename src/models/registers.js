const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
const WebUserSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        mobile:{
            type:Number,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
    }
)

// now we need to create collaction
// WebUserSchema.pre("save",async function(next){
// if(this.isModified("password"))
// {
//     console.log(`current pass:${this.password}`);
//     const InputPass=this.password;
//     const SecPassword=await bcrypt.hash(InputPass,10);
//     console.log(`current pass:${SecPassword}`);
// }
// next();
// })

const Register = new mongoose.model("Register",WebUserSchema);

module.exports = Register;