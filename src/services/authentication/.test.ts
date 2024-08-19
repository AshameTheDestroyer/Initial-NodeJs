import expect from "expect";
import { UserProps } from "../user";
import { describe, it } from "node:test";

export async function TestLogin() {
    const response = await fetch(`http://localhost:3000/authentication/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password: "1234",
            email: "hashem.wannous@unifi.solutions",
        } as UserProps),
    });

    expect(response.status).toEqual(200);

    const json = await response.json();
    expect(json).toHaveProperty("token");

    return json["token"] as string;
}

describe("POST /authentication/login", () =>
    it("Successfully logged in.", () => {
        TestLogin();
    }));
