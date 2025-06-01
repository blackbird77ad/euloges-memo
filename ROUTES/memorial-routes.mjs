import { Router } from "express";
import { verifyToken } from "../MIDDLEWARES/auth.mjs";
import {
    createMemo,
    getMemorials,
    getMemorialById,
    updateMemorial,
    deleteMemorial
} from "../CONTROLLERS/memorial-controller.mjs";

const memorialRouter = Router();

//Define Routes for Memorial
memorialRouter.post("/create-memo", verifyToken, createMemo);
memorialRouter.get("/get-memo", getMemorials );
memorialRouter.get('/get-this-memo/:id', getMemorialById);
memorialRouter.patch("/update-memo/:id", updateMemorial);
memorialRouter.delete("/delete-memo/:id", deleteMemorial)

export default memorialRouter;