import express from "express";
import {
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todoController.js";
import isAuth from "../middleware/isAuth.js";
import { body } from "express-validator";

const router = express.Router();

// get-todo
router.get("/", isAuth, getTodos);

// add-todo
router.post(
    "/add-todo",
    [body("title").notEmpty().withMessage("Title cannot be empty")],
    isAuth,
    addTodo
);

// update-todo
router.put("/:id", isAuth, updateTodo);

// delete-todo
router.delete("/:id", isAuth, deleteTodo);

export default router;
