const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//middleware to parse json request body (either bodyparser or this middleware)
app.use(express.json());

//import routes for TODO API
const todoRouters = require("./routes/todos");
//mount the todo API routes
app.use("/api/v1", todoRouters);

//start server
app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
})

//connect to database
const dbConnect = require("./config/database");
dbConnect();

//default route
app.get("/", (req,res) => {
    res.send(`<h1>THis is HOMEPAGE</h1>`);
})
