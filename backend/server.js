const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

app.use(
    "/api/meetings",
    require("./routes/meetingRoutes")
);

app.get("/", (req, res) => {
    res.send("IntellMeet Backend Running");
});

const PORT = process.env.PORT || 5000;

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/profile", authMiddleware, (req, res) => {
    res.json({
        message: "Protected Route Accessed",
        user: req.user,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});