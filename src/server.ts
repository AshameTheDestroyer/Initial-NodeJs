import { configDotenv } from "dotenv";
import { SetUpServer } from "./server-setup";

configDotenv();

SetUpServer(Number(process.env["PORT"]));
