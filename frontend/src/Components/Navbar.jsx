import React, { useContext, useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { ChatContext } from "../Context/Chat-Context";

function Navbar() {
  const ele = ["All", "Unread", "Groups"];
  const [activeEle, setActiveEle] = useState(ele[0]);

  const { loggedInUser, setLoggedInUser } = useContext(ChatContext);

  return (
    <div className="mb-3">
      <div className="flex items-center w-full h-[5%] bg-gray-100 mb-2 p-0.5">
        <img
          className="mx-4 my-1 w-8"
          src={`${loggedInUser.user.profilePic}`}
          alt=""
        />
        <p className="font-semibold text-lg text-black">
          {loggedInUser.user.fullName}
        </p>
      </div>
      <div className="mx-2 flex flex-col justify-center items-start h-[10%]">
        <div className="flex items-center justify-center bg-gray-100 shadow border rounded w-full text-gray-700 leading-tight">
          <input
            className="w-full bg-inherit px-3 text-sm font-normal text-gray-700 h-full outline-none border-none"
            type="text"
            placeholder="Search"
          />
          <MdOutlineSearch className="w-7 h-7 cursor-pointer" />
        </div>
        <div className="text-sm flex gap-2 items-center justify-center mt-2">
          {ele.map((item, index) => {
            return (
              <div
                key={index}
                className={`border rounded-full px-2 py-0.5 cursor-pointer ${
                  activeEle === item ? "active-ele" : ""
                } ${activeEle !== item ? "hover:bg-gray-100" : ""}`}
                onClick={() => {
                  setActiveEle(ele[index]);
                }}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
