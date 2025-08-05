import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

// import routing
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
    "http://localhost:8081", // buat web
    "http://192.168.1.19:8081", // buat device atau emulator via Expo
];

app.use(
    cors({
        origin: allowedOrigins,
        credentials: true, // kalau pakai cookie di auth
    })
);

connectDB();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
    res.json({ message: "API WORKING" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);

// handling global error
app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
