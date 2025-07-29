const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");

const {UserModel, TodoModel} = require("./db");
const { auth, JWT_SECRET } = require("./auth");
 
const jwt = require("jsonwebtoken");

const{z} = require("zod");

require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI);
const app = express();
app.use(express.json());

app.post("/signup", async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
    //input validation
    //req.body
    //{
    //email: string,
    //password: string
    //}
    //describing this schema in a zod object

    //step1
    //create our schema
    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),//string with min length of 3, max length of 100 that is an email
        name: z.string().min(3).max(100),
        password:z.string().min(3).max(30)
    })

    //step2
    //parsing the data
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
      res.json({
         message: "Incorrect format",
         error: parsedDataWithSuccess.error
      })
      return
    }
    

const hashedPassword = await bcrypt.hash(password,5); //5=how heavily you want to hash, computationally expensive, salt rounds
console.log(hashedPassword);

   await UserModel.create({
        email : email,
        password : hashedPassword,
        name: name
 })
 res.json({
    message: "You are logged in"
 })

});

app.post("/signin", async function(req,res){
    //when user hits signin, we first fetch the salt from database
    //then run the same algorithm again and compare it what is in database
   const email = req.body.email;
   const password = req.body.password;

   
    const user = await UserModel.findOne({
      email: email,
      
      
   });
   console.log(user);
   if(!user){
    res.status(403).json({
        message: "User does not exist in our db"
    })
   }

   //this function returns a promise
   const passwordMatch = await bcrypt.compare(password, user.password);

   if(passwordMatch){
      const token = jwt.sign({
         id: user._id.toString()
         
      },JWT_SECRET);
      res.json({
         token: token
      });
      
      
   } else {
      res.status(403).json({
         message: "incorrect credentials"
      })
   }

    

});


app.post("/todo",auth, async function(req,res){
   const userId = req.userId; 
   const title = req.body.title;
   const done = req.body.done;

   await TodoModel.create({
      userId,
      done,
      title
      
      
   })
   res.json({
      message: "Todo created"
   })

});



app.get("/todos",auth, async function(req,res){
  
   const userId = req.userId;
    
   const todos = await TodoModel.find({
      userId
   });

   res.json({
     todos
   })

});



app.listen(3000);
