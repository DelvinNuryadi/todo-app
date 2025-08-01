import mongoose from "mongoose";

export default function connectDB() {
    mongoose
        .connect(`${process.env.MONGODB_URI}/todo`)
        .then(() => console.log("Database Connected!"))
        .catch((err) => console.log(err));
}
