//server initiate
const express = require('express');
const app = express();

//used to parse req.body in express -> PUT or POST
const bodyparser = require('body-parser');

//specifically parse JSON data & add it to the request.Body object
app.use(bodyparser.json());

//activate the server on 3000 port
app.listen(3000, ()=>{
    console.log("Server Started at port no. 3000");
})

// Routes
app.get('/', (req,res) =>{
    res.send("Hello Ji, kaise ho aap");
})

app.post('/api/cars', (req, res)=>{
    const {name, brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car submitted successfully");
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase')
.then(()=>{console.log("Connection Successfull")})
.catch((error) => {
    console.log("Received an error");
    console.log(error);
});
