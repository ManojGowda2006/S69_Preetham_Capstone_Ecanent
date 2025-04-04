import jwt from "jsonwebtoken";
import 'dotenv/config'

const AuthMiddle = async(req,res,next)=>{
    const {token} = req.cookies;
    if(!token){
        return res.json({success:false,message:"Not Authorized, Login Again"})
    }
    try {
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        if(decodedToken.id){
            req.body.userId = decodedToken.id;
            
        }else{
            return res.json({success:false,message:"Not Authorized, Login Again"})
        }

        next();
        
    } catch (error) {
        console.log(error.message)
        return res.json({success:false,message:"Internal Server Error"})
    }
}

export const checkRole = (roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
      }
      next();
    };
  };


export default AuthMiddle;