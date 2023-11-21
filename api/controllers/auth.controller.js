import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utills/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    const isValidPass = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!isValidPass) {
      return next(errorHandler(401, "Invalid Credentials!"));
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWTSECRETKEY);
    const { password: hashedPassword, ...rest } = validUser._doc;
    res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const google = async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWTSECRETKEY);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ _id: user._id }, process.env.JWTSECRETKEY);
      const { password, ...rest } = user._doc;
      const expiryTime = new Date(Date.now() + 3600000);
      res
        .cookie("token", token, { httpOnly: true, expires: expiryTime })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
