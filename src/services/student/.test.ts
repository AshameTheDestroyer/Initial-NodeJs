import expect from "expect";
import { StudentProps } from "./types";
import { describe, it } from "node:test";
import { TestCRUDDocument } from "../../utils";
import { TestAgent } from "../../classes/TestAgent";

async function TestGetAllStudents() {
    const response = await TestAgent.Fetch("/student", "GET");
    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("data");
}

async function TestCRUDStudent() {
    await TestCRUDDocument({
        route: "/student",
        Fetch: (props) =>
            TestAgent.Fetch(props.route, props.method, props.body),
        updateBody: {
            name: "Updated Test Student",
        } as StudentProps,
        createBody: {
            year: 3,
            rollNumber: 3,
            subjects: ["Test"],
            name: "Test Student",
        } as StudentProps,
    });
}

TestAgent.OnAuthenticate(() =>
    describe("GET /student", () =>
        it("All students were fetched successfully.", TestGetAllStudents)),
);

TestAgent.OnAuthenticate(() =>
    describe("POST/GET/PATCH/DELETE /student => /student/:id", () =>
        it(
            "CRUD operation on student model were done successfully.",
            TestCRUDStudent,
        )),
);
