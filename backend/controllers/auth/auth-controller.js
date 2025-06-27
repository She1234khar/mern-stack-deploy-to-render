const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/Users')

const registerUser=async (req,res)=>{
  const { userName,email,password}=req.body;
 

  try{

    const checkUser=await User.findOne({email});
    if(checkUser){
      return res.send({
        succes:false,
        message:"user Already exist with same email id please try Again"
      })
    }
    const hashpassword=await bcrypt.hash(password,12);
    const newuser=new User({
      userName,email,password:hashpassword
    })
    await newuser.save();
    res.status(200).send({
      succes:true,
      message:"succesfully register"
    })

  } catch (e) {
    console.log(e);
    res.status(500).send({
      succes:false,
      message:"some error occured",
    })


  }
}

const loginUser=async (req,res)=>{
  const {email,password}=req.body;
  try{

    const checkUser=await User.findOne({email});
    if(!checkUser) return res.send({
      succes:false,
      message:"User doesn't exist please register first"
    })

    const checkPassword=await bcrypt.compare(password,checkUser.password);

    if(!checkPassword){
      return res.send({
        succes:false,
        message: "Incorrect password",
      })
    }

    const token =jwt.sign({
      id:checkUser._id,role:checkUser.role,email:checkUser.email,userName:checkUser.userName
    },'CLIENT_SECRET_KEY',{expiresIn:'60m'})

    res.cookie('token',token,{httpOnly:true,secure:true,sameSite: 'None', }).send({
      succes:true,
      message:'Logged in successfully',
      user:{
        email:checkUser.email,
        role:checkUser.role,
        id:checkUser._id,
        userName:checkUser.userName
      }
    })

    

  } catch (e) {
    console.log(e);
    res.status(500).send({
      succes:false,
      message:"error occured",
    })

  }
}

//logged out

const logout =(req,res)=>{
  res.clearCookie('token').send({
    succes:true,
    message:'logged out success'
  })
}

// middleware of auth
const authMiddleware =async(req,res,next)=>{
  const token=req.cookies.token;
  if(!token) return res.status(401).send({
    succes:false,
    message:"Unauthorised user!"
  })
  try{
    const decoded=jwt.verify(token,'CLIENT_SECRET_KEY');
    req.user=decoded;
    next();
  }catch(error){
    res.status(401).send({
      succes:false,
      message:'Unautorises user!'
    })
  }

  
}

module.exports={registerUser,loginUser,logout,authMiddleware};


//2:41