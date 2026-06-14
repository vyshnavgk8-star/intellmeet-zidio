import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [meetings, setMeetings] = useState([]);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/meetings",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setMeetings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = () => {
        localStorage.clear();

        window.location.href = "/";
    };

    return (
        <div>
            <h2>
                Welcome, {user?.name}
            </h2>

            <button onClick={logout}>
                Logout
            </button>

            <h3>Your Meetings</h3>

            {meetings.map((meeting) => (
                <div key={meeting._id}>
                    <h4>{meeting.title}</h4>

                    <p>
                        {meeting.description}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;