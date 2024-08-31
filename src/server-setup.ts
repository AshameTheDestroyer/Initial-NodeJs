import morgan from "morgan";
import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import { UserRouter } from "./services/user";
import { FileRouter } from "./services/static";
import { StudentRouter } from "./services/student";
import { SubjectRouter } from "./services/subject";
import { AuthenticationRouter } from "./services/authentication";

configDotenv();

export async function SetUpServer(port: number) {
    const app = express();
    const server = app.listen(`${port}`, () =>
        console.log(`Server is running on http://localhost:${port}`),
    );

    app.use(morgan("dev"));
    app.use(express.json());

    app.use(UserRouter);
    app.use(StudentRouter);
    app.use(SubjectRouter);
    app.use(AuthenticationRouter);

    mongoose.connection.on("open", () => {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db!);
        const storage = multer.memoryStorage();

        app.use(FileRouter(bucket, storage));
    });

    await mongoose.connect(process.env["MONGODB_URI"] ?? "");

    return server;
}
