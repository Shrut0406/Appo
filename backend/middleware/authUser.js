const jwt=require("jsonwebtoken");

// user authentication middleware

const authUser = async (req, res, next) => {
    
    try {
        const token = req.headers.token;
        
        // console.log(req.headers); 
        if (!token) {
            return res.json({success:false, message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId=decoded.id;
        next(); // Proceed to the next middleware or route handler
    } 
    catch (error) {
        return res.json({success:false, message: error.message });
    }
}

module.exports = authUser;