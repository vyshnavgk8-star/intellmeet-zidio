const Meeting = require("../models/Meeting");

exports.createMeeting = async (req, res) => {
    try {
        const { title, description } = req.body;

        const meeting = await Meeting.create({
            title,
            description,
            createdBy: req.user.id,
            participants: [req.user.id],
        });

        res.status(201).json(meeting);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMeetings = async (req, res) => {
    try {
        const meetings = await Meeting.find({
            participants: req.user.id,
        }).populate("createdBy", "name email");

        res.json(meetings);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getMeetingById = async (req, res) => {
    try {
        const meeting = await Meeting.findById(
            req.params.id
        )
            .populate("createdBy", "name email")
            .populate("participants", "name email");

        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found",
            });
        }

        res.json(meeting);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.joinMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found",
            });
        }

        const alreadyJoined = meeting.participants.some(
            (participant) =>
                participant.toString() === req.user.id
        );

        if (alreadyJoined) {
            return res.status(400).json({
                message: "You have already joined this meeting",
            });
        }

        meeting.participants.push(req.user.id);

        await meeting.save();

        res.json({
            message: "Joined meeting successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.leaveMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);

        if (!meeting) {
            return res.status(404).json({
                message: "Meeting not found",
            });
        }

        if (
    meeting.createdBy.toString() === req.user.id
) {
    return res.status(400).json({
        message:
            "Meeting creator cannot leave the meeting",
    });
}

        meeting.participants = meeting.participants.filter(
            (participant) =>
                participant.toString() !== req.user.id
        );

        await meeting.save();

        res.json({
            message: "Left meeting successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};