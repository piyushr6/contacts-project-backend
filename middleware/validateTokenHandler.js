const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
   let token;
   let authHeader = req.headers.Authorization || req.headers.authorization;
   
   if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      console.log("Checkpoint")

      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
         if (err) {
            console.log("JWT error:", err.message);
            res.status(401);
            return next(new Error("User is not authorized")); // Pass to error handler
         }

         req.user = decoded.user;
         console.log("JWT verified, user:", decoded); // ✅ 2nd checkpoint
         next(); // ✅ Crucial
      });

      console.log("Checkpoint")
   }
});

module.exports = validateToken;