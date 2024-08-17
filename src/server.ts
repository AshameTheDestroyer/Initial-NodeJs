import express from "express";
import mongoose from "mongoose";
import { configDotenv } from "dotenv";

import { UserRouter } from "./services/user";
import { StudentRouter } from "./services/student";
import { AuthenticationRouter } from "./services/authentication";

configDotenv();

const PORT = 3000;
const app = express();

app.use(express.json());
app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`),
);

mongoose.connect(process.env.MONGODB_URI ?? "");

app.use(UserRouter);
app.use(StudentRouter);
app.use(AuthenticationRouter);
