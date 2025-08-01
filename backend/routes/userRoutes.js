import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getUserData } from "../controllers/userController.js";

const router = express.Router();

router.get("/data", isAuth, getUserData);

export default router;
