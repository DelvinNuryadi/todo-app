import express from "express";
import {
    addTodo,
    deleteTodo,
    getTodos,
    updateTodo,
} from "../controllers/todoController.js";
import isAuth from "../middleware/isAuth.js";

const router = express.Router();

// get-todo
router.get("/", isAuth, getTodos);

// add-todo
router.post("/add-todo", isAuth, addTodo);

// update-todo
router.put("/:id", isAuth, updateTodo);

// delete-todo
router.delete("/:id", isAuth, deleteTodo);

export default router;
