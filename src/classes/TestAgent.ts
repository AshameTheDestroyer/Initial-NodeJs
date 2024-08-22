import expect from "expect";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { UserProps } from "../services/user";

configDotenv();

export class TestAgent {
    private static _instance: TestAgent;

    private _token?: string;
    private _subscribers: Array<Function> = [];

    public get token() {
        return this._token;
    }

    public static get instance() {
        return (this._instance ??= new TestAgent());
    }

    private constructor() {
        this.Initialize();
    }

    public static OnAuthenticate(
        callback: (typeof this.instance._subscribers)[number],
    ) {
        this.instance._subscribers.push(callback);
    }

    private async Initialize() {
        const { email, password } = await this.Signup();
        this._token = await this.Login({ email, password });

        for (const callback of this._subscribers) {
            await callback();
        }

        this.DeleteOwnAccount();
    }

    private async Signup() {
        const name = "Test Agent";
        const password = "12345678";
        const email = `${crypto.randomBytes(8).toString("hex")}@gmail.com`;

        const response = await fetch(
            "http://localhost:3000/authentication/signup",
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
        expect(response.status).toEqual(201);

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
        expect(response.status).toEqual(200);

        const json = await response.json();
        expect(json).toHaveProperty("token");
        return json["token"] as string;
    }

    private async DeleteOwnAccount() {
        const response = await fetch(`http://localhost:3000/user/mine`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this._token}`,
            },
        });
        expect(response.status).toEqual(200);
    }

    public static Fetch<T extends RequestMethod>(
        route: string,
        method: T,
        body?: T extends "GET" ? never : Record<string, any>,
    ) {
        return fetch(`http://localhost:3000${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.instance.token}`,
            },
            body: method == "GET" ? undefined : JSON.stringify(body ?? {}),
        });
    }
}
