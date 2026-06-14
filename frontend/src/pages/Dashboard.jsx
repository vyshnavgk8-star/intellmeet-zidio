import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {
    const [meetings, setMeetings] = useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

    const createMeeting = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        await api.post(
            "/meetings",
            {
                title,
                description,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setTitle("");
        setDescription("");

        fetchMeetings();
    } catch (error) {
        alert(
            error.response?.data?.message ||
            "Failed to create meeting"
        );
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

            <h3>Create Meeting</h3>

<form onSubmit={createMeeting}>
    <input
        type="text"
        placeholder="Meeting Title"
        value={title}
        onChange={(e) =>
            setTitle(e.target.value)
        }
        required
    />

    <br /><br />

    <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
            setDescription(e.target.value)
        }
    />

    <br /><br />

    <button type="submit">
        Create Meeting
    </button>
</form>

<hr />

            <h3>Your Meetings</h3>

            {meetings.length === 0 ? (
    <p>No meetings found.</p>
) : (
    meetings.map((meeting) => (
        <div key={meeting._id}>
            <h4>{meeting.title}</h4>

            <p>{meeting.description}</p>

            <hr />
        </div>
    ))
)}
        </div>
    );
}

export default Dashboard;