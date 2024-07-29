import React, { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import { IoIosCall } from "react-icons/io";
import { FaVideo } from "react-icons/fa";

function MainContentHeader({ receiver }) {
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(receiver._id);
  return (
    <>
      <div className="w-full h-[6%] bg-gray-100 p-0.5 flex gap-2 items-center justify-between">
        <div className="flex gap-4 mr-4">
          <div
            className={`avatar ${
              onlineUsers.includes(receiver._id) ? "online" : "offline"
            } mr-1`}
          >
            <div className="w-[40px] p-1 rounded-full ">
              <img src={`${receiver.profilePic}`} />
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-[15px] font-semibold">{receiver.fullName}</p>
            <p className="text-[10px]">{isOnline ? "Online" : "Offline"}</p>
          </div>
        </div>

        <div className="flex gap-4 mr-4">
          <IoIosCall className="w-6 h-6 cursor-pointer" />
          <FaVideo className="w-6 h-6 cursor-pointer" />
        </div>
      </div>
    </>
  );
}

export default MainContentHeader;
