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
