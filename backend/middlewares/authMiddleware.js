import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base

// To check if user is authenticaed then only sign in
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,  // The JWT token is expected to be in the 'Authorization' header
      process.env.JWT_SECRET      // The secret key used to verify the token
    );
    req.user = decode;
    next();                               
  } catch (error) { // If there's an error (e.g., invalid token, expired token), handle it
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
