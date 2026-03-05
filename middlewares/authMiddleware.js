const jwt=require('jsonwebtoken')

const validateToken=(req,res,next)=>{
    let token=null
    console.log("Cookies:",req.cookies)
    //check cookie
    if(req.cookies?.token){
        token=req.cookies.token
    }

    //Check authorization header
    else if(req.headers.authorization?.startsWith("Bearer ")){
        token=req.headers.authorization.split(" ")[1]
    }
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Not authorized"})
    }

    //Validate token
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
        console.log(decoded)
        req.user=decoded.payload
        next()
    } catch (error) {
        return res.status(400).json({message:"Invalid token"})
    }
}

module.exports=validateToken