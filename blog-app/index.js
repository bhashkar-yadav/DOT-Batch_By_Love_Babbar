require("dotenv").config();
const express = require("express");
const app = express();

const dbConnect = require("./config/database");
dbConnect();

app.use(express.json());

// routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/v1", blogRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
