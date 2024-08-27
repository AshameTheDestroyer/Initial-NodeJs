import { SubjectProps } from "./types";
import { TestCRUDDocument } from "../../utils";
import { TestAgent } from "../../classes/TestAgent";

async function TestGetAllSubjects() {
    const response = await TestAgent.Fetch({
        method: "GET",
        route: "/subject",
    });
    const json = await response.json();

    expect(response.status).toEqual(200);
    expect(json).toHaveProperty("data");
}

async function TestCRUDSubject() {
    await TestCRUDDocument({
        route: "/subject",
        Fetch: (props) => TestAgent.Fetch(props),
        updateBody: {
            name: "Updated Test Subject",
        } as SubjectProps,
        createBody: {
            name: "Test Subject",
            description: "Lorem ipsum.",
        } as SubjectProps,
    });
}

describe("GET /subject", () =>
    test("All subjects were fetched successfully.", TestGetAllSubjects));

describe("POST/GET/PATCH/DELETE /subject => /subject/:id", () =>
    test(
        "CRUD operations on subject model were done successfully.",
        TestCRUDSubject,
    ));
