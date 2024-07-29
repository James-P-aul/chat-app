import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/Chat-Context.jsx";
import useListenConversation from "./useListenConversation.jsx";
import { SocketContext } from "../Context/SocketContext.jsx";

function Conversation({ receiver }) {
  const { socket } = useContext(SocketContext);
  const { conversation, setConversation, loggedInUser } =
    useContext(ChatContext);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setConversation([...conversation, newMessage]);

      return () => {
        socket?.off("newMessage");
      };
    });
  }, [socket, conversation, setConversation]);

  return (
    <>
      {conversation.map((item, index) => {
        if (item.senderId === loggedInUser.user._id) {
          return (
            <div key={index} className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img alt="" src={`${loggedInUser.user.profilePic}`} />
                </div>
              </div>
              {/* <div className="chat-header">{loggedInUser.user.fullName}</div> */}
              <div className="chat-bubble">{item.message}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        } else {
          return (
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src={`${receiver.profilePic}`}
                  />
                </div>
              </div>
              {/* <div className="chat-header">{receiver.fullName}</div> */}
              <div className="chat-bubble">{item.message}</div>
              <div className="chat-footer">Seen at 12:46</div>
            </div>
          );
        }
      })}
    </>
  );
}

export default Conversation;
