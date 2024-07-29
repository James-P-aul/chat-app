import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./Router/authRouter.js";
import connectToMongo from "./config/connectToMongo.js";
import messageRouter from "./Router/messageRouter.js";
import cookieParser from "cookie-parser";
import usersRouter from "./Router/usersRouter.js";
import { app, server } from "./socket/Socket.js";

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

dotenv.config();

//end-points
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello from API");
});

server.listen(PORT, () => {
  connectToMongo();
  console.log(`listening at port: ${PORT}`);
});
