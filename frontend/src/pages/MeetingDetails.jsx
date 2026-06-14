import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

function MeetingDetails() {
    const { id } = useParams();

    const [meeting, setMeeting] = useState(null);

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

    if (!meeting) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <Navbar />

            <h2>{meeting.title}</h2>

            <p>
                {meeting.description}
            </p>

            <h3>Created By</h3>

            <p>
                {meeting.createdBy.name}
                {" - "}
                {meeting.createdBy.email}
            </p>

            <h3>Participants</h3>

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
        </div>
    );
}

export default MeetingDetails;