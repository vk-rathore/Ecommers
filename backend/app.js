const express=require("express");
var bodyParser = require('body-parser');

const errorMiddleware=require("./middleware/error");

const cookieParser=require("cookie-parser");

const fileUpload = require("express-fileupload");



const path = require("path");

const app=express();

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// parse application/json
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload())

app.use(cookieParser());


 
//Route Imports

const products=require("./routes/productRoutes");
const user=require("./routes/userRoutes");
const order=require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");


app.use("/api/v1",products);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//Middleware for error
app.use(errorMiddleware);

module.exports=app