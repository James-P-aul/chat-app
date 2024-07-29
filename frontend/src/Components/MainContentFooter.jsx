import React, { useContext, useState } from "react";
import { ChatContext } from "../Context/Chat-Context.jsx";
import { GrEmoji } from "react-icons/gr";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMicrophone } from "react-icons/tb";
import { IoMdSend } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

function MainContentFooter() {
  const { chatId, url, token } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  const onChangeHandler = (e) => {
    setMessage((prev) => e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      `${url}/api/messages/send`,
      { id: chatId, message: message },
      { headers: { token } }
    );

    if (!response.data.success) {
      console.log("error");
      toast.error("Please try again later");
    } else {
      console.log("message sent");
      toast.success("Message sent");
      setMessage("");
    }
  };

  return (
    <div className="flex items-center w-full h-[7%] bg-gray-100 absolute bottom-0 p-2">
      <GrEmoji className="w-[5%] h-full p-2 cursor-pointer " />
      <AiOutlinePlus className="w-[5%] h-full p-2 cursor-pointer " />
      <form onSubmit={onSubmitHandler} className="w-[85%] h-full font-light">
        <input
          type="text"
          placeholder="Enter message here"
          className="w-full h-full p-2 m-0 outline-none"
          onChange={onChangeHandler}
          value={message}
        />
        <button className="hidden"></button>
      </form>
      {message.length != 0 ? (
        <IoMdSend className="w-[5%] h-full p-2 cursor-pointer" />
      ) : (
        <TbMicrophone className="w-[5%] h-full p-2 cursor-pointer" />
      )}
    </div>
  );
}

export default MainContentFooter;
