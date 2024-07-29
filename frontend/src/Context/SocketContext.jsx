import { createContext, useContext, useEffect, useState } from "react";
import { ChatContext } from "./Chat-Context";
import io from "socket.io-client";

export const SocketContext = createContext();

const SocketContextProvider = (props) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { loggedInUser } = useContext(ChatContext);

  useEffect(() => {
    if (loggedInUser) {
      const socket = io("http://localhost:8000", {
        query: {
          userId: loggedInUser.user._id,
        },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [loggedInUser]);

  const context = {
    socket,
    onlineUsers,
  };

  return (
    <SocketContext.Provider value={context}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
