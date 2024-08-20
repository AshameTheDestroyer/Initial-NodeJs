import { Router } from "express";
import { ValidateAuthenticity, ValidateAuthority } from "../../middleware";
import {
    GetUsers,
    GetMyUser,
    GetUserByID,
    DeleteAllUSers,
    DeleteUserByID,
} from "./services";

export const USER_ROUTE = "/user";
export const UserRouter = Router();

UserRouter.get(USER_ROUTE, ValidateAuthenticity, GetUsers);
UserRouter.get(`${USER_ROUTE}/mine`, ValidateAuthenticity, GetMyUser);
UserRouter.get(`${USER_ROUTE}/:id`, ValidateAuthenticity, GetUserByID);

// TODO: Implement this.
// UserRouter.patch(`${USER_ROUTE}/mine`, ValidateAuthenticity, PatchMyUser);

UserRouter.delete(
    USER_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllUSers,
);
UserRouter.delete(
    `${USER_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteUserByID,
);
// TODO: Implement this.
// UserRouter.delete(`${USER_ROUTE}/mine`, ValidateAuthenticity, DeleteMyUser);
