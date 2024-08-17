import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import { UserRouter } from "./services/user";
import { StudentRouter } from "./services/student";

configDotenv();

const port = 3000;
const app = express();

app.use(express.json());
app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
);

mongoose.connect(process.env.MONGODB_URI ?? "");

app.use(UserRouter);
app.use(StudentRouter);
