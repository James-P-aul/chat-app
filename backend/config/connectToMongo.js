import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://joyjoypaul1:3yyCmCyuajHT7RrI@cluster0.xwuo6am.mongodb.net/Chat-App"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in mongoose connection");
  }
};

export default connectToMongo;
