import mongoose from "mongoose";
import { SetUpServer } from "./server-setup";
import { TestAgent } from "./classes/TestAgent";

let server: Awaited<ReturnType<typeof SetUpServer>>;

beforeAll((done) => {
    SetUpServer().then((_server) => {
        server = _server;
        TestAgent.instance.Initialize().then(() => done());
    });
});

afterAll((done) => {
    TestAgent.instance.Destruct().then(() => {
        Promise.all([mongoose.disconnect(), server.close()]).then(() => done());
    });
});
