import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded.userId);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default protectRoute;
