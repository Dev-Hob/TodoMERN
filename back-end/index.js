const express = require("express");
const mongoose = require("mongoose");
const createError = require("./utils/error.js");
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth/auth.routes.js")
const todoRoutes = require("./routes/todo/todo.routes.js")
const cors = require("cors")

require("dotenv").config();
const app = express()
const port = 3001
const dbURI = process.env.dbURI;
app.use(express.json());
const ExactHostname = "http://localhost:3000"
app.use('*', cors({ origin: ExactHostname, credentials: true }))
app.use(cookieParser());

 
app.use(function(req, res, next) {
    console.log("HOST NAME : ", req.hostname)
    console.log("REQUESTING HEADERS ", req.headers)
    console.log("REQUESTING Config ", req.config)
    res.header('Access-Control-Allow-Origin', ExactHostname);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  
app.get("/", (req, res) => {
    res.send("Hello World!")
})


app.use("/auth/", authRoutes)
app.use("/todo/", todoRoutes)
// jwt for tokenization and bcrypt for auth
// user, todos models
// user auth routes for CRUD
// todos routes for CRUD


app.use("*", (req, res, next) => {
    const error = createError(404, "Not Found!")
    next(error)
})

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMsg = err.message || "Something went wrong!";
    console.log("Error: ", err)
    return res.status(errorStatus).json(
        {   success: false,
            status: errorStatus, 
            message: errorMsg,
            // stack: err.stack
        })
})

app.listen(port, () => {
    console.log("App is listening on Port: ", port)
    mongoose.connect(dbURI)
    .then( response => console.log("MongoDB connection established!"))
    .catch( err => console.log("Error while connecting to MongoDB : ", err))
})