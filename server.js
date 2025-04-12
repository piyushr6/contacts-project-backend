// Load environment variables from .env file
const dotenv = require("dotenv").config();

// External modules
const express = require("express");

// Internal modules
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

// Connect to MongoDB
connectDb(); // this connects using the URI in your .env file

const app = express();
const port = process.env.PORT || 5000;

// Built-in middleware to parse JSON
app.use(express.json());

// Mount routes
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// Global error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
   console.log(`✅ Server is listening on port ${port}`);
});
