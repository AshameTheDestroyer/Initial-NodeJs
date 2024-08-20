import expect from "expect";
import crypto from "crypto";
import { UserProps } from "../user";
import { describe, it } from "node:test";

export class TestAgent {
    private static _instance: TestAgent;

    private _token?: string;

    private subscribers: Array<Function> = [];

    public get token() {
        return this._token;
    }

    public static get Instance() {
        return (this._instance ??= new TestAgent());
    }

    private constructor() {
        (async () => {
            const { email, password } = await this.Signup();
            this._token = await this.Login({ email, password });

            this.subscribers.forEach((callback) => callback());

            this.DeleteOwnAccount();
        })();
    }

    public static OnAuthenticate(
        callback: (typeof this.Instance.subscribers)[number],
    ) {
        this.Instance.subscribers.push(callback);
    }

    private async Signup() {
        const name = "Test Agent";
        const password = "12345678";
        const email = `${crypto.randomBytes(8).toString("hex")}@gmail.com`;

        await fetch("http://localhost:3000/authentication/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password } as UserProps),
        });

        return { email, password };
    }

    private async Login(props: { email: string; password: string }) {
        const response = await fetch(
            "http://localhost:3000/authentication/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props as UserProps),
            },
        );

        const json = await response.json();
        return json["token"] as string;
    }

    private async DeleteOwnAccount() {
        await fetch(`http://localhost:3000/user/mine`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._token}`,
            },
        });
    }

    public static Fetch(route: string, method: RequestMethod) {
        return fetch(`http://localhost:3000${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.Instance.token}`,
            },
        });
    }
}

async function TestAuthentication() {
    expect(TestAgent.Instance).toBeDefined();
}

describe("POST /authentication/signup => /authentication/login", () =>
    it("Successfully signed up then logged in.", TestAuthentication));
