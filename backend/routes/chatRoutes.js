const express = require("express");

const router = express.Router();

const authMiddleware = require(
    "../middleware/authMiddleware"
);

const {
    sendMessage,
    getMessages,
} = require("../controllers/chatController");

router.post(
    "/:meetingId",
    authMiddleware,
    sendMessage
);

router.get(
    "/:meetingId",
    authMiddleware,
    getMessages
);

module.exports = router;