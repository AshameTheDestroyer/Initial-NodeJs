import expect from "expect";
import { StudentProps } from "./types";
import { describe, it } from "node:test";
import { TestAgent } from "../authentication";

async function TestGetAllStudents() {
    const response = await TestAgent.Fetch("/student", "GET");
    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("data");
}

async function TestCRUDStudent() {
    async function TestCreateStudent() {
        const response = await TestAgent.Fetch("/student", "POST", {
            year: 3,
            rollNumber: 3,
            subjects: ["Test"],
            name: "Test Student",
        } as StudentProps);
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
        return json["_id"] as string;
    }

    async function TestReadStudent(ID: string) {
        const response = await TestAgent.Fetch(`/student/${ID}`, "GET");
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
    }

    async function TestUpdateStudent(ID: string) {
        const response = await TestAgent.Fetch(`/student/${ID}`, "PATCH", {
            name: "Updated Test Student",
        } as StudentProps);
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
    }

    async function TestDeleteStudent(ID: string) {
        const response = await TestAgent.Fetch(`/student/${ID}`, "DELETE");
        expect(response.status).toEqual(200);
    }

    const ID = await TestCreateStudent();
    await TestReadStudent(ID);
    await TestUpdateStudent(ID);
    await TestDeleteStudent(ID);
}

TestAgent.OnAuthenticate(() =>
    describe("GET /student", () =>
        it("All students were fetched successfully.", TestGetAllStudents)),
);

TestAgent.OnAuthenticate(() =>
    describe("POST/GET/PATCH/DELETE /student/:id", () =>
        it(
            "CRUD operation on student model were done successfully.",
            TestCRUDStudent,
        )),
);
