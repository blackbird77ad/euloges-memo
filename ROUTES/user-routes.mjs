import { Router } from "express";
import { signUser, SignIn } from "../CONTROLLERS/user-controller.mjs";

import { verifyToken } from "../MIDDLEWARES/auth.mjs";

const userRouter = Router();

//User Authentication routes
userRouter.post('/signup', signUser);
userRouter.post('/signin', SignIn)

export default userRouter;