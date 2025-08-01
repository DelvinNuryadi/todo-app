import todoModel from "../models/todoModel.js";

export const getTodos = async (req, res, next) => {
    try {
        const todos = await todoModel.find({ user: req.userId });

        return res.status(200).json({
            success: true,
            message: "Todos retrieved",
            data: todos,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const addTodo = async (req, res, next) => {
    const { title } = req.body;

    try {
        const todo = new todoModel({
            title: title,
            user: req.userId,
        });
        await todo.save();
        return res.status(201).json({
            success: true,
            message: "Todo added",
            data: todo,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const updateTodo = async (req, res, next) => {
    const todoId = req.params.id;
    const { title, completed } = req.body;

    try {
        const todo = await todoModel.findOne({ _id: todoId, user: req.userId });

        if (!todo) {
            const error = new Error("todo not found");
            error.statusCode = 500;
            throw error;
        }

        if (typeof title !== "undefined") {
            todo.title = title;
        }

        if (typeof completed !== "undefined") {
            todo.completed = completed;
        }

        await todo.save();

        return res.status(200).json({
            success: true,
            message: "Todo Updated",
            data: todo,
        });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

export const deleteTodo = async (req, res, next) => {
    const todoId = req.params.id;
    try {
        const todo = await todoModel.findOneAndDelete({
            _id: todoId,
            user: req.userId,
        });

        if (!todo) {
            const error = new Error("todo not found");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({ success: true, message: "Todo Deleted" });
    } catch (error) {
        if (!error) {
            error.statusCode = 500;
        }
        next(error);
    }
};
