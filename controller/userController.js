const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// @desc    register a user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
   const { username, email, password } = req.body;

   if (!username || !email || !password) {
      res.status(400);
      throw new Error("All fields are compulsory!");
   }
   const userAvailable = await User.findOne({ email });
   if (userAvailable) {
      res.status(400);
      throw new Error("User already registered");
   }


   //Hashed password
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log("Hashed password : ", hashedPassword);

   const user = await User.create({
      username,
      email,
      password: hashedPassword,
   });
   console.log(`User created ${user}`);


   if (user) {
      res.status(201).json({ _id: user.id, email: user.email });
   } else {
      res.status(400);
      throw new Error("User data is not valid");
   }

   res.json({ message: "Register the User" });
});


// @desc    login a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
   }

   const user = await User.findOne({ email });

   // Compare password with hashed password
   if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
         {
            user: {
               username: user.username,
               email: user.email,
               id: user.id,
            },
         },
         process.env.ACCESS_TOKEN_SECRET,
         { expiresIn: "1h" }
      );

      res.status(200).json({
         _id: user.id,
         username: user.username,
         email: user.email,
         token: accessToken,
      });


   } else {
      res.status(401);
      throw new Error("Email or password is not valid");
   }
});


// @desc    Fetch a user
// @route   GET /api/users/current
// @access  Private
const currentUser = asyncHandler(async (req, res) => {
   res.status(200).json(req.user);
});


module.exports = { registerUser, loginUser, currentUser };