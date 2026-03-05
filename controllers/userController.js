const User=require('../models/userSchema')
const bcrypt=require('bcrypt')
const generateToken=require('../utils/generateToken')

const getUsers=async (req,res)=>{
    try {
      const users=await User.find()
      res.status(200).json({
         success:true,
         data:users
      })
    } catch (error) {
      res.status(500).json({
         success:false,
         message:"Server error while fetching users",
         error:error.message
      })
    }
}

//Get user by id
const getUsersById=async (req,res)=>{
    try {
      const userId=req.params?.id
      const user=await User.findById(userId)

      if(!user){
         return res.status(404).json({
            success:false,
            message:"User not found"
         })
      }
      res.status(200).json({
         success:true,
         data:user
      })
    } catch (error) {
      res.status(400).json({
         success:false,
         message:"Invalid User ID",
         error:error.message
      })
    }
}

const createUser=async(req,res)=>{
 try {
   const saltRounds=10
   const {name,email,password,role}=req.body
   bcrypt.hash(password,saltRounds,async(err,hash)=>{
      if(err){
         return res.status(500).json({error:err.message})
      }
      var userItem={
         name:name,
         email:email,
         password:hash,
         role:role
      }

      const user=new User(userItem)
      await user.save()
      res.status(201).json({user:user,message:"User created"})
   })
    
 } catch (error) {
    res.status(500).json({message:error.message})
 }
}

//update user
const updateUser=async (req,res)=>{
    try {
      const userId=req.params?.id
      const updatedUser=await User.findByIdAndUpdate(userId,req.body,{//findByIdAndUpdate
         new:true, //returns updated doc
         runValidators:true //enforces schema validation
      })

      if(!updatedUser){
         return res.status(404).json({
            success:false,
            message:"User not found"
         })
      }
      res.status(200).json({
         success:true,
         data:updatedUser,
         message:"User updated successfully"
      })
    } catch (error) {
      res.status(400).json({
         success:false,
         message:"Failed to update user",
         error:error.message
      })
    }
}


const login=async(req,res)=>{
   try {
      if(!req.body){
         return res.status(400).json({error:"Login details cannot be empty"})
      }
      const {email,password}=req.body
      if((!email) || (!password)){
         return res.status(400).json({error:"Login details cannot be empty"})
      }

      const user=await User.findOne({email:email})
      if(!user){
         return res.send(404).json({message:"User not found"})
      }

      //console.log(user.password)
      //password validation will change later
      const isValid=await bcrypt.compare(password,user.password)
      if(!isValid){
         return res.status(404).json({message:"Invalid password"})
      }
      console.log(isValid)
      //user is authenticated,create token
      let payload={user:email,role:user.role}
      const token=generateToken(payload)
      res.cookie("token",token)
     res.status(200).json({message:"Login successful"})
      //res.status(200).json({message:"Login successful",token:token})


   } catch (error) {
      console.log(error)
      res.status(500).json(error.message)
   }
}

const deleteUser = async (req, res) => {
  try {
    const del_User_Id = req.params.id;

    if (!del_User_Id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const deletedUser = await User.findByIdAndDelete(del_User_Id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      deletedUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const checkUser=async (req,res) => {
 return  res.status(200).json({message:"User validated"})
}

module.exports={getUsers,createUser,getUsersById,updateUser,login,checkUser,deleteUser}