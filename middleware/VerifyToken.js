const jwt = require('jsonwebtoken')


const verifyToken = async (req,res,next)=> {
    const authHeader = req.headers.authorization
    // console.log(authHeader);
    if(!authHeader)
    {
        return res.status(401).json({
            success: false,
            msg: "You are not authorized to access the resource. Please Log in to your account first",

        })
    }
    try {
        const token = authHeader.split(' ')[1];
        const payload = await jwt.verify(token, process.env.JWT_SEC)
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            msg: "You are not authorized to access the resource. Please Log in to your account first",
            error,
        })
    }

}

const verifyTokenAndAuthorization = (req,res,next)=>{
    verifyToken(req,res,()=> {
        if(req.user.id === req.params.id || req.user.isAdmin)
        {
            next();
        }else {
            res.status(403).json({
                success:false,
                msg: "You are not allowed to do that moron!",
            })
        }
    })
}

const verifyTokenAndIsAdmin = (req,res,next)=>{
    verifyToken(req,res,()=> {
        if(req.user.isAdmin)
        {
            next();
        }else {
            res.status(403).json({
                success:false,
                msg: "Only admins are allowed to access this resource",
            })
        }
    })
}

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndIsAdmin}