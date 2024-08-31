import { FileProps } from "./types";
import { TestCRUDDocument } from "../../utils";
import { TestAgent } from "../../classes/TestAgent";

async function TestCreateAndReadFile() {
    async function TestCreate() {
        const data = new FormData();
        data.append("file", new File([], "Whatever"));

        const response = await TestAgent.Fetch({
            body: data,
            method: "POST",
            route: "/static",
        });
        const json = await response.json();

        expect(response.status).toEqual(201);
        expect(json).toHaveProperty("_id");

        return json["_id"] as string;
    }

    async function TestRead(ID: string) {
        const response = await TestAgent.Fetch({
            method: "GET",
            route: `/static/${ID}`,
        });
        const json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toHaveProperty("_id");
    }

    const ID = await TestCreate();
    await TestRead(ID);
}

describe("GET /static => POST /static/:id", () =>
    test("Created a file then read it successfully.", TestCreateAndReadFile));
