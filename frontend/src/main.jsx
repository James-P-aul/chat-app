import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ChatContextProvider from "./Context/Chat-Context.jsx";
import { BrowserRouter } from "react-router-dom";
import SocketContextProvider from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </ChatContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
