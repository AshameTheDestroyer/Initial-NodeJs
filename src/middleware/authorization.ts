import { RequestHandler } from "express";
import { UserModel, UserProps } from "../services/user";

export const ValidateAuthority: (
    requiredRole: UserProps["role"],
) => RequestHandler = (requiredRole) => (request, response, next) =>
    UserModel.findById(
        (request as typeof request & { userId: string })["userId"],
    )
        .then((user) =>
            user == null
                ? response.send({ message: "User isn't found." })
                : user.role != requiredRole
                ? response.send({
                      message: `User is unauthorized, should have the role of "${requiredRole}".`,
                  })
                : next(),
        )
        .catch((error) => response.status(500).send(error));
