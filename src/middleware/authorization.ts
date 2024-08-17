import { RequestHandler } from "express";
import { UserModel, UserProps } from "../services/user";

export const ValidateAuthority: (
    ...requiredRoles: Array<UserProps["role"]>
) => RequestHandler =
    (...requiredRoles) =>
    (request, response, next) =>
        UserModel.findById(
            (request as typeof request & { userId: string })["userId"],
        )
            .then((user) =>
                user == null
                    ? response.send({ message: "User isn't found." })
                    : !requiredRoles.includes(user.role)
                    ? response.send({
                          message:
                              "User is unauthorized, should have the role of " +
                              new Intl.ListFormat("en-US", {
                                  style: "long",
                                  type: "disjunction",
                              }).format(requiredRoles) +
                              ".",
                      })
                    : next(),
            )
            .catch((error) => response.status(500).send(error));
