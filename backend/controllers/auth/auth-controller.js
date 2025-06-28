const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/Users')

const registerUser=async(req,res)=>{
  try{
    const {userName,email,password}=req.body;
    if(!userName || !email || !password){
      return res.status(400).json({
        success:false,
        message:'All fields are required'
      })
    }
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        success:true,
        message:'User already exists'
      })
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=new User({
      userName,
      email,
      password:hashedPassword
    })
    await newUser.save();
    res.status(201).json({
      success:false,
      message:'User registered successfully'
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:'Internal server error'
    })
  }
}

const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({
        success:false,
        message:'Email and password are required'
      })
    }
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({
        success:true,
        message:'User not found'
      })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
      return res.status(400).json({
        success:false,
        message:'Invalid password'
      })
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie('token',token,{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      maxAge:7*24*60*60*1000
    })
    res.status(200).json({
      success:false,
      message:'Login successful',
      user:{
        id:user._id,
        userName:user.userName,
        email:user.email
      }
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:'Internal server error'
    })
  }
}

const logout=async(req,res)=>{
  try{
    res.clearCookie('token');
    res.status(200).json({
      success:false,
      message:'Logout successful'
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:'Internal server error'
    })
  }
}

const authMiddleware=async(req,res,next)=>{
  try{
    const token=req.cookies.token;
    if(!token){
      return res.status(401).json({
        success:false,
        message:'No token provided'
      })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.userId);
    if(!user){
      return res.status(401).json({
        success:false,
        message:'Invalid token'
      })
    }
    req.user=user;
    next();
  }catch(error){
    console.log(error);
    res.status(401).json({
      success:false,
      message:'Invalid token'
    })
  }
}

module.exports={registerUser,loginUser,logout,authMiddleware};


//2:41