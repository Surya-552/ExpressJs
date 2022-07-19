const mongoose= require("mongoose");


// mongoose.connect("mongodb://localhost:27017/WebProjectData",{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
//     useCreateIndex:true
// }).then(()=>{
//     console.log(`connection successful`);
// }).catch((e)=>{
//     console.log(`no connection`);
// })
const localUrl='mongodb://localhost:27017/WebProjectData';
const conUrl='mongodb+srv://Surya:Surya972@mydatabase.mcgsi.mongodb.net/WebProjectData?retryWrites=true&w=majority';
mongoose.connect(conUrl,{
    }).then(()=>{
        console.log(`connection successful`);
    }).catch((e)=>{
        console.log(`no connection`);
    });
mongoose.Promise=Promise;
//mongoose.set('debug',true);