import crypto from "crypto";
import Jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UserModel } from "../user/schema";
import { CheckPassword, HashPassword } from "../../utils";

export const EmendUserBody = (
    body: Record<string, any>,
    hashedPassword?: string,
) => ({
    ...body,
    password: hashedPassword,
    role:
        process.env["ALLOW_ROLE_KEY"] != null &&
        body["allowRoleKey"] == process.env["ALLOW_ROLE_KEY"]
            ? body["role"]
            : undefined,

    _resetToken: undefined,
    _resetTokenExpirationDate: undefined,
});

export const Signup: RequestHandler = (request, response) =>
    UserModel.findOne({ email: request.body["email"] })
        .then((user) =>
            user != null
                ? response
                      .status(400)
                      .send({ message: "Email is already taken." })
                : HashPassword(request.body["password"]).then(
                      (hashedPassword) =>
                          new UserModel(
                              EmendUserBody(request.body, hashedPassword),
                          )
                              .save()
                              .then(() =>
                                  response.status(201).send({
                                      message:
                                          "User has signed up successfully.",
                                  }),
                              ),
                  ),
        )
        .catch((error) => response.status(500).send(error));

export const Login: RequestHandler = (request, response) =>
    UserModel.findOne({ email: request.body["email"] })
        .then((user) =>
            user == null
                ? response
                      .status(401)
                      .send({ message: "Email isn't registered." })
                : CheckPassword(request.body["password"], user.password).then(
                      (isPasswordCorrect) =>
                          isPasswordCorrect
                              ? response.send({
                                    token: Jwt.sign(
                                        { userId: user._id },
                                        process.env["JWT_KEY"]!,
                                    ),
                                })
                              : response.status(401).send({
                                    message: `Password is incorrect.`,
                                }),
                  ),
        )
        .catch((error) => response.status(500).send(error));

export const ForgotPassword: (
    resetTokenExpirationTime: number,
    OnGenerateResetToken: (props: {
        email: string;
        resetToken: string;
    }) => void,
) => RequestHandler =
    (resetTokenExpirationTime, OnGenerateResetToken) =>
    async (request, response) => {
        try {
            const user = await UserModel.findOne({
                email: request.body["email"],
            });
            if (user == null) {
                return response
                    .status(401)
                    .send({ message: "Email isn't registered." });
            }

            const resetToken = crypto.randomBytes(20).toString("hex");

            OnGenerateResetToken({ email: user.email, resetToken });

            user._resetToken = resetToken;
            user._resetTokenExpirationDate =
                Date.now() + resetTokenExpirationTime;

            await user.save();
            return response.send({
                message: "Password reset token has been sent.",
            });
        } catch (error) {
            return response.status(500).send(error);
        }
    };

export const ResetPassword: RequestHandler = async (request, response) => {
    try {
        const user = await UserModel.findOne({
            _resetToken: request.body["resetToken"],
            _resetTokenExpirationDate: { $gt: Date.now() },
        });

        if (user == null) {
            return response
                .status(401)
                .send({ message: "Reset token is either invalid or expired." });
        }

        const hashedPassword = await HashPassword(request.body["newPassword"]);

        user.password = hashedPassword;
        user._resetToken = undefined;
        user._resetTokenExpirationDate = undefined;

        await user.save();
        return response.send({
            message: "Password has been reset successfully.",
        });
    } catch (error) {
        return response.status(500).send(error);
    }
};
