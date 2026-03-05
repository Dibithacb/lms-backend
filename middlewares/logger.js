const myLog=(req,res,next)=>{
    console.log(res.body)
    next()
}

module.exports=myLog