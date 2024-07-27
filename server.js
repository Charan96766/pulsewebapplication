const mongoose = require("mongoose"); 
const express = require("express");
const cors = require("cors"); 
const morgan = require("morgan");  
const multer = require("multer"); 
const fs = require("fs"); 
const path = require("path");  
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// const { insertMany } = require("moongose/models/user_model");
// const { users } = require("mongose/models");

app = express();
app.use(cors()); 
app.use('/uploads', express.static('uploads')); 


let connectToDb = async (req, res) => {
  try {  
     await mongoose.connect("mongodb+srv://charan:charan@cluster0.wao88ph.mongodb.net/UsersDB?retryWrites=true&w=majority");  
    console.log("succesfully connected to DB"); 
  } catch (err) {  
      console.log(err);
      console.log("unable to connect to DB");
} 

}  

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  image:String,
  email: String,
  password: String
});


let User = new mongoose.model("user", userSchema); 

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads")
    },
  filename: function (req, file, cb) { 
    // console.log(file);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage })

// let authoriseUser = (req,res,next) => {
//     console.log("inside authoriseUser"); 
//     next();
//   }

// app.use(authoriseUser);

app.listen(7777, () => {
    console.log("listening to port 7777");
}); 

app.post("/signUp", upload.single("image"), async (req, res) => { 
  console.log("Received Data")
  console.log(req.body); 
  console.log(req.file) 
  let hashedPassword = await bcrypt.hash(req.body.password,10);

  try {
    let newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      image: req.file.path,
      email: req.body.email,
      password: hashedPassword,
    });   
  await User.insertMany([newUser]); 
  console.log("user created succesfully");
  res.json({ status: "success", msg: "created succesfully"});
} catch (err) { 

  console.log("unable to save to db");
  res.json({ status: "failure", msg: "unable to connect" });
}

}); 

app.post("/validateToken", upload.none(), async (req, res) => {  
  console.log(req.body.token);  
  try {
    let decreptedToken = jwt.verify(req.body.token, "cherry"); 
    let userDetails = await  User.find().and({ email: decreptedToken.email });
    if (userDetails.length > 0) {
      if (decreptedToken.password == userDetails[0].password) {
        res.json({ status: "success", data:userDetails});
      } else {
        res.json({ status: "failure", msg: "Invalid Password" });
      }
    } else {
      res.json({ status: "failure", msg: "Invalid Token" });
    }  
  } catch (err) { 
    res.json({ status: "failure", msg: "Invalid Token" });
  }
 
  
});

app.post("/validatelogin", upload.none(), async (req, res) => {   

  
  let dataFromDb = await User.find().and([{email: req.body.email}]);   
  console.log(dataFromDb); 
  if (dataFromDb.length > 0) {   
    let unHasedPassword = await bcrypt.compare(req.body.password, dataFromDb[0].password); 
    console.log(unHasedPassword);
    if (unHasedPassword==true) {
      let token = jwt.sign({ email: dataFromDb[0].email, password: dataFromDb[0].password }, "cherry"); 
      res.json({ status: "success", data: dataFromDb,tokenData:token }); 
      console.log(token);
    } else {
      res.json({ status: "failure", msg: "wrong password" }); 
    }
  } 
  else {
    res.json({status: "failure", msg: "invalid username"});
  };
   
  console.log(req.body);
}); 

app.put("/update", upload.single("image"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  try {

    await User.updateMany({email: req.body.email }, { password: req.body.password,image: req.file.path,age: req.body.age,firstName: req.body.firstName,lastName: req.body.lastName });
    res.json({ status: "success", msg: "user updated successfully" });
   } catch (err)
  {
    res.json({ status: "failure", msg: err});
   }
  // await User.updateMany({ email: req.body.email }, { image: req.file.path });
  // await User.updateMany({ email: req.body.email }, { password: req.body.password });
  // await User.updateMany({ email: req.body.email }, { age: req.body.age }); 
  // await User.updateMany({ email: req.body.email }, { firstName: req.body.firstName }); 
  // await User.updateMany({ email: req.body.email }, { lastName: req.body.lastName});
}) 

app.delete("/delete", upload.none(), async (req, res)=> {
await User.deleteMany({email:req.body.email}); 
  console.log(req.body);
})



connectToDb(); 