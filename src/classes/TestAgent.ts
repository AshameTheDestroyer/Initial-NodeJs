import expect from "expect";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { UserProps } from "../services/user";

configDotenv();

export class TestAgent {
    private static _instance: TestAgent = new TestAgent();

    private _token?: string;

    public get token() {
        return this._token;
    }

    public static get instance() {
        return this._instance;
    }

    private constructor() {}

    public async Initialize() {
        const { email, password } = await this.Signup();
        this._token = await this.Login({ email, password });
    }

    public async Destruct() {
        await this.DeleteOwnAccount();
        this._token = undefined;
    }

    private async Signup() {
        const name = "Test Agent";
        const password = "12345678";
        const email = `${crypto.randomBytes(8).toString("hex")}@gmail.com`;

        const response = await fetch(
            `http://localhost:${process.env["PORT"]}/authentication/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role: "admin",
                    allowRoleKey: process.env["ALLOW_ROLE_KEY"],
                } as unknown as UserProps & { allowRoleKey?: string }),
            },
        );
        expect(response?.status).toEqual(201);

        return { email, password };
    }

    private async Login(props: { email: string; password: string }) {
        const response = await fetch(
            `http://localhost:${process.env["PORT"]}/authentication/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(props as UserProps),
            },
        );
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("token");
        return json["token"] as string;
    }

    private async DeleteOwnAccount() {
        const response = await fetch(
            `http://localhost:${process.env["PORT"]}/user/mine`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this._token}`,
                },
            },
        );
        expect(response.status).toEqual(200);
    }

    public static async Fetch<T extends RequestMethod>(
        route: string,
        method: T,
        body?: T extends "GET" ? never : Record<string, any>,
    ) {
        if (this.instance.token == undefined) {
            await this.instance.Initialize();
        }

        return fetch(`http://localhost:${process.env["PORT"]}${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.instance.token}`,
            },
            body: method == "GET" ? undefined : JSON.stringify(body ?? {}),
        });
    }
}
