import React, { useEffect, useState } from "react";
import axios from "axios";

export const ChatContext = React.createContext(null);

const ChatContextProvider = (props) => {
  const url = "http://localhost:8000";
  const [token, setToken] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [chatId, setChatId] = useState(null);
  const [conversation, setConversation] = useState([]);

  const getAllUsers = async (token) => {
    const response = await axios.get(`${url}/api/users`, {
      headers: { token },
    });
    setAllUsers(response.data.users);
  };

  // useEffect(() => {
  //   const setter = () => {
  //     if (localStorage.getItem("token")) {
  //       setToken(localStorage.getItem("token"));
  //       getAllUsers(token);
  //       // setLoggedInUser
  //     }
  //   };
  //   setter();

  //   // return clearToken();
  // }, [token]);

  useEffect(() => {
    return () => {
      localStorage.setItem("token", "");
      setLoggedInUser(null);
    };
  }, []);

  const contextValue = {
    url,
    token,
    setToken,
    loggedInUser,
    setLoggedInUser,
    allUsers,
    setAllUsers,
    getAllUsers,
    chatId,
    setChatId,
    conversation,
    setConversation,
  };

  return (
    <ChatContext.Provider value={contextValue}>
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
