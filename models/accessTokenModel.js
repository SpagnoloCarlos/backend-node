import mongoose from "mongoose";
const { Schema } = mongoose;

const tokenModel = new Schema({
  clientId: { type: String },
  clientSecret: { type: String },
  username: { type: String },
  password: { type: String },
});

const Token = mongoose.model("Client", tokenModel);

export default Token;
