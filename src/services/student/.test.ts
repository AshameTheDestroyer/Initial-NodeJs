import { StudentProps } from "./types";
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

describe("GET /student", () =>
    test("All students were fetched successfully.", TestGetAllStudents));

describe("POST/GET/PATCH/DELETE /student => /student/:id", () =>
    test(
        "CRUD operations on student model were done successfully.",
        TestCRUDStudent,
    ));
