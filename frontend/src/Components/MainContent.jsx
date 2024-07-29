import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Context/Chat-Context";
import Conversation from "./Conversation.jsx";
import MainContentHeader from "./MainContentHeader.jsx";
import MainContentFooter from "./MainContentFooter.jsx";
import axios from "axios";
import useListenConversation from "./useListenConversation.jsx";

function MainContent() {
  const { chatId, url, token, allUsers, setConversation } =
    useContext(ChatContext);

  const [receiver, setReceiver] = useState({});

  const getConversation = async (id) => {
    // http://localhost:8000/api/messages/get
    const response = await axios.post(
      `${url}/api/messages/get`,
      { id },
      {
        headers: { token },
      }
    );

    if (response.data.messages) {
      setConversation(response.data.messages);
    }
  };

  useEffect(() => {
    setReceiver(allUsers.find((item) => item._id == chatId));

    if (chatId) {
      getConversation(chatId);
    }

    console.log("main content reloded");
    return () => {
      setConversation([]);
    };
  }, [chatId]);

  return (
    <div className="h-full relative m-0 p-0 ">
      <MainContentHeader receiver={receiver} />
      <div className="h-[87%] overflow-auto mt-3">
        <Conversation receiver={receiver} />
      </div>
      <MainContentFooter />
    </div>
  );
}

export default MainContent;
