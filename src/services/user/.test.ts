import { UserProps } from "./types";
import { TestAgent } from "../../classes/TestAgent";

async function TestGetUser() {
    async function TestGetMyUser() {
        const response = await TestAgent.Fetch({
            method: "GET",
            route: "/user/mine",
        });
        const json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toHaveProperty("_id");

        return json["_id"] as string;
    }

    async function TestGetUserByID(ID: string) {
        const response = await TestAgent.Fetch({
            method: "GET",
            route: `/user/${ID}`,
        });
        const json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toHaveProperty("_id");
    }

    const ID = await TestGetMyUser();
    await TestGetUserByID(ID);
}

async function TestPatchMyUser() {
    const response = await TestAgent.Fetch({
        method: "PATCH",
        route: "/user/mine",
        body: { name: "Updated Test Agent" } as UserProps,
    });
    const json = await response.json();

    expect(response.status).toEqual(200);
    expect(json).toHaveProperty("_id");
}

async function TestGetAllUsers() {
    const response = await TestAgent.Fetch({
        method: "GET",
        route: "/user",
    });
    const json = await response.json();

    expect(response.status).toEqual(200);
    expect(json).toHaveProperty("data");
}

describe("GET /user/mine => /user/:id", () =>
    test("My user data was fetched successfully.", TestGetUser));

describe("PATCH /user/mine", () =>
    test("My user data was patched successfully.", TestPatchMyUser));

describe("GET /user", () =>
    test("All users were fetched successfully.", TestGetAllUsers));
