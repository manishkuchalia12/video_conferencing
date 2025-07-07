import express from "express";
import { createServer } from "node:http";


import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({ limit: "40kb", extended: true }));
app.use("/api/v1/users", userRoutes);


// const start = async () => {
//     const connectionDb = await mongoose.connect("");
//     console.log(`Connected to MongoDB: ${connectionDb.connection.host}`);
//     server.listen(app.get("port"), () => {
//         console.log("Server is running on port 8000");
//     });
// }
const start = async () => {
    const connectionDb = await mongoose.connect("mongodb://127.0.0.1:27017/videoApp");
    console.log(`Connected to MongoDB: ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });
}
start();
