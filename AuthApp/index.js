const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

//route import for mount
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(PORT, () =>{
    console.log(`App is listeninig at ${PORT}`);
})