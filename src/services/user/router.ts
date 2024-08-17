import { Router } from "express";
import { GetUserByID, GetUsers } from "./services";
import { ValidateAuthenticity } from "../../middleware";

export const USER_ROUTE = "/user";
export const UserRouter = Router();

UserRouter.get(USER_ROUTE, ValidateAuthenticity, GetUsers);
UserRouter.get(`${USER_ROUTE}/:id`, ValidateAuthenticity, GetUserByID);
// UserRouter.get(`${USER_ROUTE}/mine`, ValidateAuthenticity, GetMyUser);

// UserRouter.patch(`${USER_ROUTE}/mine`, ValidateAuthenticity, PatchMyUser);
