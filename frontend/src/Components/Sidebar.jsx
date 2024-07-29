import React, { useContext, useEffect } from "react";

import { CiLogout } from "react-icons/ci";
import Navbar from "./Navbar";
import { ChatContext } from "../Context/Chat-Context";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../Context/SocketContext";

function Sidebar() {
  // const navigate= useNavigate();

  const {
    setToken,
    loggedInUser,
    setLoggedInUser,
    allUsers,
    chatId,
    setChatId,
  } = useContext(ChatContext);

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(loggedInUser.user._id);

  const logout = () => {
    setToken("");
    localStorage.setItem("token", "");
    setLoggedInUser(null);
  };

  return (
    <div className="h-full bg-gray-50">
      <Navbar />
      <hr className="border-none h-0.5 w-full mx-auto bg-gray-200" />
      <div className="h-[76%] w-full overflow-auto scrollbar-hide flex flex-col gap-0">
        {allUsers.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div
                className="flex py-1 cursor-pointer hover:bg-gray-200 min-h-14"
                onClick={() => setChatId(item._id)}
              >
                <div className="pl-1 ">
                  <div
                    className={`avatar ${
                      onlineUsers.includes(item._id) ? "online" : "offline"
                    }`}
                  >
                    <div className="w-[50px] p-1 rounded-full">
                      <img src={`${item.profilePic}`} />
                    </div>
                  </div>
                </div>
                <div className="w-[80%] flex justify-between items-center p-2">
                  <div className="font-semibold">{item.fullName}</div>
                  <div className="text-sm font-light">yesterday</div>
                </div>
              </div>
              <hr className="outline-none h-0.25 w-[90%] mx-auto bg-black" />
            </React.Fragment>
          );
        })}
      </div>
      <div className="bg-gray-100 h-[7%] m-0 p-0 flex items-center relative">
        <CiLogout
          onClick={() => logout()}
          className="w-7 h-7 cursor-pointer absolute left-2"
        />
      </div>
    </div>
  );
}

export default Sidebar;

// className="flex h-[78%] w-full flex-col justify-start items-center max overflow-auto scrollbar-hide"
