import Jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { UserModel } from "../user/schema";

export const SignUp: RequestHandler = (request, response) =>
    UserModel.findOne({ email: request.body["email"] })
        .then((user) =>
            user != null
                ? response
                      .status(400)
                      .send({ message: "Email is already taken." })
                : new UserModel({ ...request.body, role: "user" })
                      .save()
                      .then(() =>
                          response.send({
                              message: "User has signed up successfully.",
                          }),
                      ),
        )
        .catch((error) => response.status(500).send(error));

export const Login: RequestHandler = (request, response) =>
    UserModel.findOne({ email: request.body["email"] })
        .then((user) =>
            user != null
                ? user.password != request.body["password"]
                    ? response
                          .status(401)
                          .send({ message: "Password is incorrect." })
                    : response.send({
                          token: Jwt.sign({ userId: user._id }, "secretKey"),
                      })
                : response
                      .status(401)
                      .send({ message: "Email isn't registered." }),
        )
        .catch((error) => response.status(500).send(error));
