const express=require('express')
const router = express.Router();
const User= require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET="Harry is a good boy"

// Route:1 create a user using post not require auth//

   router.post('/createUser',[
    body('name','Enter your valid name').isLength({ min: 5 }),
    body('email' , 'Enter your valid email').isEmail(),
    body('password','Your password must be at least 5 characters').isLength({ min: 5 }),
   ] ,
   
   async (req, res) => {
    //If there are errors return bad request and errors//
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success=false;
      return res.status(400).json({ sucess , errors: errors.array() });
    }
   
    
  
    try{
    // check whether the user with same email exist already//
    let user = await User.findOne({email: req.body.email});
if(user){
  success=false;
  return res.status(400).json({success , error:"User with this email already exists"})


}
    const salt =await bcrypt.genSalt(10);
    const secpass= await bcrypt.hash(req.body.password,salt);
    // Create a new user
     user= await User.create({
        name: req.body.name ,
        email:req.body.email,
        password: secpass,
      })//.then(user => res.json(user))
    // res.send(req.body);//

 // .catch(err=>{console.log(err)
   // res.json({error:"Please enter a unique value for email "})})
   const data={
    user:{
        id:user.id   
    }}
   const authtoken = jwt.sign(data , JWT_SECRET);  
   //console.log(jwtData)

    //res.json(user);
   success=true;
   res.json({success , authtoken})
} 
   catch(error){
       console.error(error.message);
       res.status(400).send("Some error has occured")
   }
})
  
 //Route 2:  Authenticate a user using : Post "api/auth/login" . No login required.

 router.post('/login',[

    body('email' , 'Enter your valid email').isEmail(),
    body('password', 'passwords cannot be blank').exists(),
   ] ,
   async (req, res) => {
    
    console.log(req.body);
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}= req.body;
   try{

    let user= await User.findOne({email});
    if(!user){
      success=false;
        return  res.status(400).json({success , error:"Please try to log in with correct credentials" })
    }
     
    let passwordCompare= await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success=false;
     return res.status(400).json({success , errors: "Please try to log in with correct credentials"})
 }
   const  data={
    user:{
        id: user.id  
    }}
   
    const authtoken = jwt.sign(data , JWT_SECRET);
    success = true;
    res.json({ success, authtoken })
   }

   catch(error){
    console.error(error.message);
    res.status(500).send("Some error has occured")
  }

   } );



//Route 3:  Provide the details of a logged in user
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})
module.exports = router
   







  