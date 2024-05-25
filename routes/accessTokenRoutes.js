import express from "express";
import { accessTokenSchema } from "../validationSchemas/accessTokenValidationSchema.js";
import { createValidator } from "express-joi-validation";
import { catchErrors } from "../middlewares/joiMiddleware.js";
import tokenController from "../controllers/accessTokenController.js";

export const tokenRouter = (Token) => {
  const tokenRouter = express.Router();
  const validator = createValidator({ passError: true });
  const { postAccessToken, postNewClient } = tokenController(Token);

  tokenRouter
    .route("/authorization/accessToken")
    .post(validator.body(accessTokenSchema), catchErrors(postAccessToken));

  tokenRouter
    .route("/authorization/newClient")
    .post(validator.body(accessTokenSchema), catchErrors(postNewClient));

  // Middleware de manejo de errores
  tokenRouter.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
      const errors = err.error.details.map((detail) => detail.message);
      res.status(400).json({ status: 1, errors });
    } else {
      next(err);
    }
  });

  return tokenRouter;
};
