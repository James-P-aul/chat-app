import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";

const connectToMongo = async () => {
  try {
    await mongoose.connect(
      ""
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error in mongoose connection");
  }
};

export default connectToMongo;
