import express from "express";
import {
  getAllSentMessages,
  getMessages,
  sendMessage,
} from "../Controller/messageController.js";
import protectRoute from "../Middleware/protectRoute.js";

const messageRouter = express.Router();

messageRouter.post("/send", protectRoute, sendMessage);
messageRouter.get("/getsentmessages", protectRoute, getAllSentMessages);
messageRouter.post("/get", protectRoute, getMessages);

export default messageRouter;
