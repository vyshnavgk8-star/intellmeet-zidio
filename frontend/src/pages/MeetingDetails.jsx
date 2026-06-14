import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

import VideoMeeting from "../components/VideoMeeting";

function MeetingDetails() {
    const { id } = useParams();

    const [meeting, setMeeting] = useState(null);
    const [showMeeting, setShowMeeting] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchMeeting();
    }, []);

    const fetchMeeting = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await api.get(
                `/meetings/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setMeeting(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const joinMeeting = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            `/meetings/${id}/join`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchMeeting();

        alert("Joined meeting");
    } catch (error) {
        alert(error.response?.data?.message);
    }
};

const leaveMeeting = async () => {
    try {
        const token = localStorage.getItem("token");

        await api.post(
            `/meetings/${id}/leave`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        fetchMeeting();

        alert("Left meeting");
    } catch (error) {
        alert(error.response?.data?.message);
    }
};

const isParticipant =
    meeting?.participants?.some(
        (participant) =>
            participant._id === user.id
    );

    if (!meeting) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />

            <h2>{meeting.title}</h2>

<p>{meeting.description}</p>

<button
    onClick={() => setShowMeeting(true)}
>
    Join Video Meeting
</button>

{isParticipant ? (
    <button onClick={leaveMeeting}>
        Leave Meeting
    </button>
) : (
    <button onClick={joinMeeting}>
        Join Meeting
    </button>
)}

            <h3>Created By</h3>

            <p>
                {meeting.createdBy.name}
                {" - "}
                {meeting.createdBy.email}
            </p>

            <h3>Participants</h3>

<p>
    Total Participants: {meeting.participants.length}
</p>

            <ul>
                {meeting.participants.map(
                    (participant) => (
                        <li
                            key={
                                participant._id
                            }
                        >
                            {participant.name}
                            {" - "}
                            {participant.email}
                        </li>
                    )
                )}
            </ul>

            {showMeeting && (
    <VideoMeeting
        roomName={`intellmeet-${meeting._id}`}
    />
)}
        </div>
    );
}

export default MeetingDetails;