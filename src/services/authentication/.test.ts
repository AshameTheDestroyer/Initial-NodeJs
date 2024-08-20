import expect from "expect";
import { UserProps } from "../user";
import { describe, it } from "node:test";

export async function GetToken() {
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

    const json = await response.json();
    return json["token"] as string;
}

async function TestLogin() {
    const token = GetToken();
    expect(token).toBeDefined();
}

describe("POST /authentication/login", () =>
    it("Successfully logged in.", TestLogin));
