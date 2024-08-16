import { Router } from "express";
import { SignUp } from "./services";

export const AUTHENTICATION_ROUTE = "/auth";
export const AuthenticationRouter = Router();

AuthenticationRouter.post(`${AUTHENTICATION_ROUTE}/signup`, SignUp);
