const jwt=require('jsonwebtoken');

// admin authentication middleware

const authAdmin = async (req, res, next) => {
    
    try {
        const token = req.headers.atoken;
        // console.log(token); 
        if (!token) {
            return res.json({success:false, message: 'Access denied. No token provided.' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded!== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
            return res.json({success:true, message: 'Forbidden. Invalid token.' });
        }
        req.admin = decoded; // Attach the decoded admin info to the request object
        next(); // Proceed to the next middleware or route handler
    } 
    catch (error) {
        return res.json({success:false, message: error.message });
    }
}

module.exports = authAdmin;
