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

app.use(
    "/api/chat",
    require("./routes/chatRoutes")
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

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {

    socket.on(
        "joinRoom",
        (meetingId) => {
            socket.join(meetingId);
        }
    );

    socket.on(
        "leaveRoom",
        (meetingId) => {
            socket.leave(meetingId);
        }
    );

    socket.on(
    "sendMessage",
    (data) => {

        io.to(
            data.roomId
        ).emit(
            "newMessage",
            data.message
        );

    }
);

socket.on(
    "typing",
    (roomId) => {

        socket
            .to(roomId)
            .emit(
                "userTyping"
            );

    }
);
});

server.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});