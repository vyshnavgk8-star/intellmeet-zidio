import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";
import Navbar from "../components/Navbar";

import VideoMeeting from "../components/VideoMeeting";
import {
  FaVideo,
  FaUsers,
  FaComments
} from "react-icons/fa";

function MeetingDetails() {
    const { id } = useParams();

    const [meeting, setMeeting] = useState(null);
    const [showMeeting, setShowMeeting] = useState(false);
    const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchMeeting();
        fetchMessages();
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

    const fetchMessages = async () => {
    try {
        const token = localStorage.getItem("token");

        const response = await api.get(
            `/chat/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setMessages(response.data);
    } catch (error) {
        console.error(error);
    }
};

const sendMessage = async (e) => {
    e.preventDefault();

    try {
        const token = localStorage.getItem("token");

        await api.post(
            `/chat/${id}`,
            {
                message: newMessage,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setNewMessage("");

        fetchMessages();
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
            <div className="card shadow-sm mb-4">
  <div className="card-body">

            <div className="card shadow-sm mb-4">
  <div className="card-body">
    <h2>{meeting.title}</h2>

    <p>{meeting.description}</p>

    <span className="badge bg-primary">
      Participants: {meeting.participants.length}
    </span>
  </div>
</div>

<button
 className="btn btn-success"
 onClick={() =>
  setShowMeeting(true)
 }
>
  <FaVideo />
  {" "}
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

            <div className="card shadow-sm mb-3">
  <div className="card-body">
    <h5>Created By</h5>

    <p>
      {meeting.createdBy.name} -
      {meeting.createdBy.email}
    </p>
  </div>
</div>
            <div className="card shadow-sm mb-4">
  <div className="card-body">
    <h5><FaUsers />
{" "} Participants</h5>

    <ul className="list-group">
      {meeting.participants.map(
        (participant) => (
          <li
            key={participant._id}
            className="list-group-item"
          >
            {participant.name}
            {" - "}
            {participant.email}
          </li>
        )
      )}
    </ul>
  </div>
</div>

<div className="card shadow-sm mb-4">
  <div className="card-body">

    <h5><FaComments />
{" "}Meeting Chat</h5>

    <div
      className="border rounded p-3 mb-3"
      style={{
        height: "300px",
        overflowY: "auto"
      }}
    >
      {messages.map((msg) => (
        <div
          key={msg._id}
          className="bg-light rounded p-2 mb-2"
        >
          <strong>
            {msg.sender.name}
          </strong>

          <br />

          {msg.message}
        </div>
      ))}
    </div>

    <form onSubmit={sendMessage}>
      <div className="input-group">

        <input
          type="text"
          className="form-control"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) =>
            setNewMessage(
              e.target.value
            )
          }
          required
        />

        <button
          className="btn btn-primary"
          type="submit"
        >
          Send
        </button>

      </div>
    </form>

  </div>
</div>

            {showMeeting && (
    <VideoMeeting
        roomName={`intellmeet-${meeting._id}`}
    />
)}
        </div>
        </div>
        </div>
    );
}

export default MeetingDetails;