import mongoose from "mongoose";
const { Schema } = mongoose;

const userModel = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },
  password: { type: String },
  email: { type: String },
  phone: { type: Number },
});

const User = mongoose.model("User", userModel);

export default User;
