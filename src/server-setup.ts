import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import { UserRouter } from "./services/user";
import { StudentRouter } from "./services/student";
import { SubjectRouter } from "./services/subject";
import { AuthenticationRouter } from "./services/authentication";

configDotenv();

export async function SetUpServer() {
    const app = express();
    const server = app.listen(process.env["PORT"], () =>
        console.log(
            `Server is running on http://localhost:${process.env["PORT"]}`,
        ),
    );

    app.use(morgan("dev"));
    app.use(express.json());

    app.use(UserRouter);
    app.use(StudentRouter);
    app.use(SubjectRouter);
    app.use(AuthenticationRouter);

    await mongoose.connect(process.env["MONGODB_URI"] ?? "");

    return server;
}
