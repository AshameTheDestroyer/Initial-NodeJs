import { Router } from "express";
import { Login, SignUp } from "./services";

export const AUTHENTICATION_ROUTE = "/auth";
export const AuthenticationRouter = Router();

AuthenticationRouter.post(`${AUTHENTICATION_ROUTE}/signup`, SignUp);
AuthenticationRouter.post(`${AUTHENTICATION_ROUTE}/login`, Login);
