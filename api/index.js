import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
dotenv.config();
const connect = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => console.log("MongoDB connected!"))
    .catch(() => console.log("Error connectiig your DB!"));
};

const app = express();
app.use(express.json());
connect();
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
