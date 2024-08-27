import expect from "expect";
import crypto from "crypto";
import { configDotenv } from "dotenv";
import { RequestMethod } from "../types";
import { UserProps } from "../services/user";

configDotenv();

type FetchProps<T extends RequestMethod> = {
    method: T;
    route: string;
    requireAuthentication?: boolean;
};

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

        const response = await TestAgent.Fetch({
            method: "POST",
            requireAuthentication: false,
            route: "/authentication/signup",
            body: {
                name,
                email,
                password,
                role: "admin",
                allowRoleKey: process.env["ALLOW_ROLE_KEY"],
            } as UserProps & { allowRoleKey?: string },
        });

        expect(response?.status).toEqual(201);

        return { email, password };
    }

    private async Login(props: { email: string; password: string }) {
        const response = await TestAgent.Fetch({
            method: "POST",
            body: props as UserProps,
            requireAuthentication: false,
            route: "/authentication/login",
        });
        const json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toHaveProperty("token");

        return json["token"] as string;
    }

    private async DeleteOwnAccount() {
        const response = await TestAgent.Fetch({
            method: "DELETE",
            route: "/user/mine",
        });

        expect(response.status).toEqual(200);
    }

    public static async Fetch<T extends RequestMethod>(
        props: T extends "GET"
            ? FetchProps<T>
            : FetchProps<T> & { body?: Record<string, any> },
    ) {
        const { method, route, requireAuthentication = true } = props;

        if (requireAuthentication && this.instance.token == undefined) {
            await this.instance.Initialize();
        }

        return fetch(`http://localhost:${process.env["TEST_PORT"]}${route}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.instance.token}`,
            },
            body:
                method != "GET" ? JSON.stringify(props.body ?? {}) : undefined,
        });
    }
}
