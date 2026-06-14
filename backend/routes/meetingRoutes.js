const express = require("express");

const router = express.Router();

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const {
    createMeeting,
    getMeetings,
    getMeetingById,
    joinMeeting,
    leaveMeeting,
} = require("../controllers/meetingController");

router.post("/", authMiddleware, createMeeting);

router.get("/", authMiddleware, getMeetings);

router.get("/:id", authMiddleware, getMeetingById);

router.post("/:id/join", authMiddleware, joinMeeting);

router.post("/:id/leave", authMiddleware, leaveMeeting);

module.exports = router;