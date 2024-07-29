import { useContext, useEffect, useState } from "react";
import "./App.css";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Login from "./Pages/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import { ChatContext } from "./Context/Chat-Context";

function App() {
  const { token } = useContext(ChatContext);

  return (
    <>
      <ToastContainer />
      <div className="p-4 h-screen flex items-center justify-center">
        {!token ? <Login /> : <Home />}
      </div>
    </>
  );
}

export default App;
