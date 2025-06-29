import jwt from "jsonwebtoken";

export const tokenVerify = async (req, res, next) => {
    try {
        console.log("Authorization Header:", req.headers?.authorization);
        console.log("Cookies:", req.cookies);

        let token = req.cookies?.token || req.headers.authorization.split(" ")[1];
        

        if (!token) {
            return res.status(401).json({ message: "DON'T HAVE ANY TOKEN! Please login" });
        }

        const decode = jwt.verify(token, process.env.JWT);
        if(!decode){
            return res.status(401).json({ message: "Token Expire! Please login" });
        }
        req.user = decode; 
        next();
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ message: "Invalid or Expired Token" });
    }
};
