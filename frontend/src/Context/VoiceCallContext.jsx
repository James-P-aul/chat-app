import { ZegoExpressEngine } from "zego-express-engine-webrtc";

const zg = new ZegoExpressEngine(appID, server);

// Log in to a room. It returns `true` if the login is successful.
// The roomUserUpdate callback is disabled by default. To receive this callback, you must set the `userUpdate` property to `true` when logging in to a room.
const result = await zg.loginRoom(
  roomID,
  token,
  { userID, userName },
  { userUpdate: true }
);

// Callback for updates on the current user's room connection status.
zg.on("roomStateUpdate", (roomID, state, errorCode, extendedData) => {
  if (state == "DISCONNECTED") {
    // Disconnected from the room
    console.log("User disconnected from Voice call");
  }

  if (state == "CONNECTING") {
    // Connecting to the room
    console.log("User connecting from Voice call");
  }

  if (state == "CONNECTED") {
    // Connected to the room
    console.log("User connected from Voice call");
  }
});

// Callback for updates on the status of ther users in the room.
zg.on("roomUserUpdate", (roomID, updateType, userList) => {
  console.warn(
    `roomUserUpdate: room ${roomID}, user ${
      updateType === "ADD" ? "added" : "left"
    } `,
    JSON.stringify(userList)
  );
});

// Callback for updates on the status of the streams in the room.
zg.on(
  "roomStreamUpdate",
  async (roomID, updateType, streamList, extendedData) => {
    if (updateType == "ADD") {
      // New stream added, start playing the stream.
      console.log("new Stream added");
    } else if (updateType == "DELETE") {
      // Stream deleted, stop playing the stream.
      console.log("stream deleted");
    }
  }
);

// After calling the createZegoStream method, you need to wait for the ZEGOCLOUD server to return the local stream object before any further operation.
const localStream = await zg.createZegoStream({
  camera: { audio: true, video: false },
});
// Call the playAudio method on the localStream instance to play audio preview before or during streaming
localStream.playAudio();

// localStream is the MediaStream object created by calling creatStream in the previous step.
zg.startPublishingStream(streamID, localStream);

const remoteStream = await zg.startPlayingStream(streamID);
// Create remote stream view.
// remoteAudio is a local <video> or <audio> object
remoteAudio.srcObject = remoteStream;

const StopPublishingStream = () => {
  zg.stopPublishingStream(streamID);
};

const DestroyStream = () => {
  // localStream is the MediaStream object created when calling the createZegoStream method.
  zg.destroyStream(localStream);
};

const StopPlayingStream = () => {
  zg.stopPlayingStream(streamID);
};

const LogoutRoom = () => {
  zg.logoutRoom(roomID);
};

const DestroyEngine = () => {
  zg.destroyEngine();
  zg = null;
};
