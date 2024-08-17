import { Router } from "express";
import { GetUserByID, GetUsers } from "./services";

export const USER_ROUTE = "/user";
export const UserRouter = Router();

UserRouter.get(USER_ROUTE, GetUsers);
UserRouter.get(`${USER_ROUTE}/:id`, GetUserByID);
// UserRouter.get(`${USER_ROUTE}/mine`, GetMyUser);

// UserRouter.patch(`${USER_ROUTE}/mine`, PatchMyUser);
