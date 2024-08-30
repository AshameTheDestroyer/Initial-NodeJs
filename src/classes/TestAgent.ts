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
    private _name = "Test Agent";
    private _password = "12345678";
    private _email = `${crypto.randomBytes(8).toString("hex")}@gmail.com`;

    public get token() {
        return this._token;
    }

    public static get instance() {
        return this._instance;
    }

    private constructor() {}

    public async Initialize() {
        await this.Signup();
        this._token = await this.Login();
    }

    public async Destruct() {
        await this.Logout();
        this._token = await this.Login();
        await this.DeleteOwnAccount();
        this._token = undefined;
    }

    private async Signup() {
        const response = await TestAgent.Fetch({
            method: "POST",
            requireAuthentication: false,
            route: "/authentication/signup",
            body: {
                role: "admin",
                name: this._name,
                email: this._email,
                password: this._password,
                allowRoleKey: process.env["ALLOW_ROLE_KEY"],
            } as UserProps & { allowRoleKey?: string },
        });

        expect(response?.status).toEqual(201);
    }

    private async Login() {
        const response = await TestAgent.Fetch({
            method: "POST",
            requireAuthentication: false,
            route: "/authentication/login",
            body: {
                email: this._email,
                password: this._password,
            } as UserProps,
        });
        const json = await response.json();

        expect(response.status).toEqual(200);
        expect(json).toHaveProperty("token");

        return json["token"] as string;
    }

    private async Logout() {
        const response = await TestAgent.Fetch({
            method: "POST",
            route: "/authentication/logout",
        });
        expect(response.status).toEqual(201);
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
