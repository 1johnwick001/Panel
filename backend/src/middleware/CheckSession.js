//Create a middleware function to verify the JWT token before granting access to protected routes
import jwt from "jsonwebtoken";


function verifyToken(req,res,next) {
  const token = req.headers.authorization;
  

  if (!token) {
    return res.status(401).json({
      message:"Unauthorized!! No Token provided",
    })
  }

  try {

    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(verified);
    req.client = verified;
    next()    
  } catch (error) {
    res.status(400).json({
      message:"invalid token"
    })
  }

}

export default verifyToken