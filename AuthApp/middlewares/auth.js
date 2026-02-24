// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        let token;

        // 1️⃣ Get token from cookies
        if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // 2️⃣ Get token from request body
        else if (req.body && req.body.token) {
            token = req.body.token;
        }

        // 3️⃣ Get token from Authorization header
        else if (req.headers.authorization) {
            token = req.headers.authorization.replace("Bearer ", "");
        }

        // If token not found
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // Verify token
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        } 
        catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        next();
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
};

exports.isStudent = (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "This route is accessible only to Students",
            });
        }
        next();
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role verification failed",
        });
    }
};

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "This route is accessible only to Admin",
            });
        }
        next();
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role verification failed",
        });
    }
};