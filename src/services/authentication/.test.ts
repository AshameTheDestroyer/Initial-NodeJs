import expect from "expect";
import { describe, it } from "node:test";
import { TestAgent } from "../../classes/TestAgent";

async function TestAuthentication() {
    expect(TestAgent.instance).toBeDefined();
}

describe("POST /authentication/signup => /authentication/login", () =>
    it("Successfully signed up then logged in.", TestAuthentication));
