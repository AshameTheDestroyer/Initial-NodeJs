import mongoose from "mongoose";
import { StudentProps } from "./types";
import { SubjectProps } from "../subject";
import { TestAgent } from "../../classes/TestAgent";
import { TestCRUDDocument, GenerateCRUDableDocument } from "../../utils";

async function TestGetAllStudents() {
    const response = await TestAgent.Fetch({
        method: "GET",
        route: "/student",
    });
    expect(response.status).toEqual(200);
    const json = await response.json();
    expect(json).toHaveProperty("data");
}

async function TestCRUDStudent() {
    const CRUDableSubject = await GenerateCRUDableDocument({
        route: "/subject",
        Fetch: (props) => TestAgent.Fetch(props),
        createBody: {
            name: "Test Subject",
            description: "Lorem ipsum.",
        } as SubjectProps,
    });

    const subjectID = await CRUDableSubject.CreateDocument();

    await TestCRUDDocument({
        route: "/student",
        Fetch: (props) => TestAgent.Fetch(props),
        updateBody: {
            name: "Updated Test Student",
        } as StudentProps,
        createBody: {
            year: 3,
            rollNumber: 3,
            name: "Test Student",
            subjects: [new mongoose.Types.ObjectId(subjectID)],
        } as StudentProps,
    });

    await CRUDableSubject.DeleteDocument(subjectID);
}

describe("GET /student", () =>
    test("All students were fetched successfully.", TestGetAllStudents));

describe("POST/GET/PATCH/DELETE /student => /student/:id", () =>
    test(
        "CRUD operations on student model were done successfully.",
        TestCRUDStudent,
    ));
