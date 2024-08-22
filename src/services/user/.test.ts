import expect from "expect";
import { UserProps } from "./types";
import { describe, it } from "node:test";
import { TestAgent } from "../../classes/TestAgent";

async function TestGetUser() {
    async function TestGetMyUser() {
        const response = await TestAgent.Fetch("/user/mine", "GET");
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
        return json["_id"] as string;
    }

    async function TestGetUserByID(ID: string) {
        const response = await TestAgent.Fetch(`/user/${ID}`, "GET");
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("_id");
    }

    const ID = await TestGetMyUser();
    await TestGetUserByID(ID);
}

async function TestPatchMyUser() {
    const response = await TestAgent.Fetch("/user/mine", "PATCH", {
        name: "Updated Test Agent",
    } as UserProps);
    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("_id");
}

async function TestGetAllUsers() {
    const response = await TestAgent.Fetch("/user", "GET");
    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("data");
}

TestAgent.OnAuthenticate(() =>
    describe("GET /user/mine => /user/:id", () =>
        it("My user data was fetched successfully.", TestGetUser)),
);

TestAgent.OnAuthenticate(() =>
    describe("PATCH /user/mine", () =>
        it("My user data was patched successfully.", TestPatchMyUser)),
);

TestAgent.OnAuthenticate(() =>
    describe("GET /user", () =>
        it("All users were fetched successfully.", TestGetAllUsers)),
);
