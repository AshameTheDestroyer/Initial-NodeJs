import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { SetUpServer } from "./server-setup";
import { TestAgent } from "./classes/TestAgent";

configDotenv();

let server: Awaited<ReturnType<typeof SetUpServer>>;

beforeAll((done) => {
    SetUpServer(Number(process.env["TEST_PORT"])).then((_server) => {
        server = _server;
        TestAgent.instance.Initialize().then(() => done());
    });
});

afterAll((done) => {
    TestAgent.instance.Destruct().then(() => {
        Promise.all([mongoose.disconnect(), server.close()]).then(() => done());
    });
});
