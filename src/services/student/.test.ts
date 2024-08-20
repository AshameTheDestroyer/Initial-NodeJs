import expect from "expect";
import { describe, it } from "node:test";
import { TestAgent } from "../authentication";

async function TestGetAllStudents() {
    const response = await TestAgent.Fetch("/student", "GET");
    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("data");
}

TestAgent.OnAuthenticate(() =>
    describe("GET /student", () =>
        it("All students were successfully fetched.", TestGetAllStudents)),
);
