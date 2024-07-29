import React, { useContext, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import MainContent from "../../Components/MainContent";
import { ChatContext } from "../../Context/Chat-Context";
import WelcomePage from "../../Components/WelcomePage";

function Home() {
  const { chatId } = useContext(ChatContext);

  return (
    <div className=" flex w-[95%] h-[97%] bg-white">
      <div className="w-[25%] h-full border-r-2 border-gray-300 m-0 p-0">
        <Sidebar />
      </div>
      <div className="w-[75%] h-full chat-background">
        {!chatId ? <WelcomePage /> : <MainContent />}
      </div>
    </div>
  );
}

export default Home;
