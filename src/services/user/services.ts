import { UserModel } from "./schema";
import { RequestHandler } from "express";
import { EmendUserBody } from "../authentication";
import {
    GetDocuments,
    GetDocumentByID,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

export const GetMyUser: RequestHandler = (request, response) => {
    UserModel.findById({
        _id: (request as typeof request & { userID: string }).userID,
    })
        .select(["-password", "-_resetToken", "-_resetTokenExpirationDate"])
        .then((user) =>
            user != null
                ? response.send(user)
                : response.status(404).send({ message: "User isn't found." }),
        )
        .catch(
            (error) => (console.error(error), response.status(500).send(error)),
        );
};

export const GetUsers = GetDocuments(
    UserModel,
    "-password",
    "-_resetToken",
    "-_resetTokenExpirationDate",
);
export const GetUserByID = GetDocumentByID(
    UserModel,
    "-password",
    "-_resetToken",
    "-_resetTokenExpirationDate",
);

export const PatchMyUser: RequestHandler = (request, response) => {
    UserModel.findByIdAndUpdate(
        {
            _id: (request as typeof request & { userID: string }).userID,
        },
        { ...EmendUserBody(request.body), email: undefined },
        { new: true },
    )
        .select(["-password", "-_resetToken", "-_resetTokenExpirationDate"])
        .then((user) =>
            user != null
                ? response.send(user)
                : response.status(404).send({ message: "User isn't found." }),
        )
        .catch(
            (error) => (console.error(error), response.status(500).send(error)),
        );
};

export const DeleteMyUser: RequestHandler = (request, response) => {
    UserModel.findByIdAndDelete({
        _id: (request as typeof request & { userID: string }).userID,
    })
        .then((user) =>
            user == null
                ? response.status(404).send({ message: "User isn't found." })
                : response.send({
                      message: "Your user has been deleted successfully.",
                  }),
        )
        .catch(
            (error) => (console.error(error), response.status(500).send(error)),
        );
};

export const DeleteAllUSers = DeleteAllDocuments(UserModel);
export const DeleteUserByID = DeleteDocumentByID(UserModel);
