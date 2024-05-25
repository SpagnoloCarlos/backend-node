import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { expressjwt as jwt, UnauthorizedError } from "express-jwt";
import User from "./models/userModels.js";
import Token from "./models/accessTokenModel.js";
import { userRouter } from "./routes/userRoutes.js";
import { tokenRouter } from "./routes/accessTokenRoutes.js";

mongoose
  .connect("mongodb://127.0.0.1:27017/ABM")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.all(
  "/api/*",
  jwt({
    secret: process.env.SECRET_TOKEN,
    algorithms: ["HS256"],
  }).unless({
    path: ["/api/authorization/accessToken", "/api/authorization/newClient"],
  })
);
app.use(function (err, req, res, next) {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({ status: 1, message: "Unauthorized" });
  } else {
    next(err);
  }
});
app.use("/api", userRouter(User), tokenRouter(Token));

app.listen(process.env.PORT, () => {
  console.log(`Running on PORT ${process.env.PORT}`);
});
