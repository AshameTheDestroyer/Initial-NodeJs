import { Router } from "express";
import { ValidateAuthenticity, ValidateAuthority } from "../../middleware";
import {
    GetUsers,
    GetMyUser,
    PatchMyUser,
    GetUserByID,
    DeleteMyUser,
    DeleteAllUSers,
    DeleteUserByID,
} from "./services";

export const USER_ROUTE = "/user";
export const UserRouter = Router();

UserRouter.get(`${USER_ROUTE}/mine`, ValidateAuthenticity, GetMyUser);

UserRouter.get(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    GetUsers,
);
UserRouter.get(`${USER_ROUTE}/:id`, ValidateAuthenticity, GetUserByID);

UserRouter.patch(`${USER_ROUTE}/mine`, ValidateAuthenticity, PatchMyUser);

UserRouter.delete(`${USER_ROUTE}/mine`, ValidateAuthenticity, DeleteMyUser);

// UNTESTED!
UserRouter.delete(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllUSers,
);
// UNTESTED!
UserRouter.delete(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteUserByID,
);
