import expect from "expect";
import { describe, it } from "node:test";
import { GetToken } from "../authentication";

async function TestGetAllStudents() {
    const token = await GetToken();
    const response = await fetch(`http://localhost:3000/student`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("data");
}

describe("GET /student", () =>
    it("All students were successfully fetched.", TestGetAllStudents));
