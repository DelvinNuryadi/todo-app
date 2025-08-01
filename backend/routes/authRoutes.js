import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("name cannot be empty"),
        body("email").isEmail().withMessage("enter a valid email"),
        body("password")
            .isLength({ min: 4 })
            .withMessage("Password length min 4 characters"),
    ],
    register
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").notEmpty().withMessage("password cannot be empty"),
    ],
    login
);

router.post("/logout", logout);

export default router;
