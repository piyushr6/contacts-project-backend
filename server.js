const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

//app.use is invoked whenever we want to use a middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use(errorHandler)

app.listen(port, () => {
   console.log(`server is listeninng on port ${port}`);
});