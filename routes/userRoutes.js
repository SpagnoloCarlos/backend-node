import express from "express";
import userController from "../controllers/userController.js";
import {
  userSchema,
  loginSchema,
} from "../validationSchemas/userValidationSchema.js";
import { createValidator } from "express-joi-validation";
import { catchErrors, joiErrors } from "../middlewares/joiMiddleware.js";

export const userRouter = (User) => {
  const userRouter = express.Router();
  const validator = createValidator({ passError: true });
  const { getAllUsers, postUsers, loginUser } = userController(User);

  userRouter
    .route("/users")
    .get(getAllUsers)
    .post(validator.body(userSchema), catchErrors(postUsers));

  userRouter
    .route("/login")
    .post(validator.body(loginSchema), catchErrors(loginUser));

  // Middleware de manejo de errores
  userRouter.use((err, req, res, next) => {
    joiErrors(err, req, res, next);
  });

  return userRouter;
};
