const Chat = require("../models/Chat");

exports.sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        const chat = await Chat.create({
            meeting: req.params.meetingId,
            sender: req.user.id,
            message,
        });

        res.status(201).json(chat);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const messages = await Chat.find({
            meeting: req.params.meetingId,
        })
            .populate("sender", "name email")
            .sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};