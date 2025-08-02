import mongoose from "mongoose";

export default function connectDB() {
    mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mycluster.bkxmske.mongodb.net/${process.env.DB_NAME}`
        )
        .then(() => console.log("Database Connected!"))
        .catch((err) => console.log(err));
}
