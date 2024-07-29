import User from "../Model/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const genToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);

  return token;
};

export const signup = async (req, res) => {
  try {
    // console.log(req.body);
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // console.log(req.body);

    if (password !== confirmPassword) {
      return res.json({ success: false, message: "Passwords don't match" });
    }

    const user = await User.findOne({ userName });

    if (user) {
      return res.json({ success: false, message: "Username already exists" });
    }

    //hash-password
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    const newUser = new User({
      userName: userName,
      fullName: fullName,
      password: hashPassword,
      gender: gender,
      profilePic: gender === "Male" ? boyProfilePic : girlProfilePic,
    });

    await newUser.save();
    const token = genToken(newUser._id, res);
    res.json({
      success: true,
      _id: newUser._id,
      fullName: newUser.fullName,
      userName: newUser.userName,
      profilePic: newUser.profilePic,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (!user) {
      return res.json({ success: false, message: "Incorrect Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Incorrect Credentials" });
    }

    const token = genToken(user._id, res);
    return res.status(201).json({
      token: token,
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(200).json({ success: true, message: "Logged Out Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
