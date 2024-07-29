import React, { useContext, useEffect } from "react";
import { SocketContext } from "../Context/SocketContext";
import { ChatContext } from "../Context/Chat-Context";

const useListenConversation = () => {
  const { socket } = useContext(SocketContext);
  const { conversation, setConversation } = useContext(ChatContext);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      console.log("message caught");
      setConversation([...conversation, newMessage]);

      return () => {
        socket?.off("newMessage");
      };
    });
  }, [socket, conversation, setConversation]);
};

export default useListenConversation;
