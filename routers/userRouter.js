const express=require('express')
const userRouter=express.Router()
const {getUsers,createUser,getUsersById,updateUser,login,checkUser, deleteUser}=require('../controllers/userController')
const myLog=require('../middlewares/logger')
const validateToken=require('../middlewares/authMiddleware')

//localhost:3000/users-Base path
userRouter.get('/',getUsers)
userRouter.get('/checkUser',validateToken,checkUser)
userRouter.post('/',myLog,createUser)
userRouter.get('/:id',getUsersById)
userRouter.patch('/:id',validateToken,updateUser)
userRouter.post('/register',myLog,createUser)
userRouter.post('/login',login)

//delete user
userRouter.delete('/:id',deleteUser)//,validateToken




module.exports=userRouter