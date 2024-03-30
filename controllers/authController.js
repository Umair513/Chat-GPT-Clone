const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const ExistingEmail = await userModel.findOne({ email });
    if (ExistingEmail) {
      return next(new errorResponse("Email is already Registered", 500));
    }
    const user = userModel.create({ username, email, password });
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new errorResponse("Please provide email and password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Incalid Credentials", 401));
    }
    const isMatch = await userModel.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid username or password", 401));
    }
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
exports.logoutController = async (req, res) => {
  res.clearCookie("refreashToken");
  return res.status(200).json({
    success: true,
    message: "Logout Success",
  });
};
