import { JitsiMeeting } from "@jitsi/react-sdk";

function VideoMeeting({ roomName }) {
    return (
        <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomName}
            getIFrameRef={(iframeRef) => {
                iframeRef.style.height = "700px";
                iframeRef.style.width = "100%";
            }}
        />
    );
}

export default VideoMeeting;