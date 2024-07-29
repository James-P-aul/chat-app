import express from "express";
import { getAllUsers } from "../Controller/getUsersController.js";
import protectRoute from "../Middleware/protectRoute.js";

const usersRouter = express.Router();

usersRouter.get("/", protectRoute, getAllUsers);

export default usersRouter;
