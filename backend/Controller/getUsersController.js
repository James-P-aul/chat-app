import User from "../Model/UserModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;
    const senderId = user._id;

    const filteredUsers = await User.find({ _id: { $ne: senderId } });

    res.status(201).json({ users: filteredUsers });
  } catch (error) {
    console.log("Error in getAllUsers " + error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
