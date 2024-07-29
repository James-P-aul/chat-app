import { populate } from "dotenv";
import Conversation from "../Model/Conversation.js";
import Message from "../Model/Message.js";
import { getReceiverSocketId, io } from "../socket/Socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.body;
    const senderId = req.user._id;
    const { message } = req.body;

    let convo = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!convo) {
      convo = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    convo.messages.push(newMessage._id);

    await Promise.all([newMessage.save(), convo.save()]);
    // await newMessage.save();
    // await convo.save();

    //socket io
    const receiverSocketId = getReceiverSocketId(receiverId);
    const senderSocketId = getReceiverSocketId(senderId);

    if (receiverSocketId) {
      //send to a particular client not all
      io.to(receiverSocketId).emit("newMessage", newMessage);
      io.to(senderSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({
      success: true,
      message: await Message.findOne({ _id: newMessage._id }).populate(
        "receiverId"
      ),
    });
  } catch (error) {
    console.log("Error in message controller sendMessage " + error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllSentMessages = async (req, res) => {
  const senderId = req.user._id;

  const messages = await Message.find({ senderId: senderId });
  console.log(messages);
  res.status(201).json({ data: messages });
};

export const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.body;

    // console.log(senderId + " " + receiverId);

    const convo = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!convo) {
      return res.status(201).json({ messages: null });
    }
    res.status(201).json({ messages: convo.messages });
  } catch (error) {
    console.log("Error in getMessages " + error);
    res.status(500).json({ message: "Internal server error" });
  }
};
