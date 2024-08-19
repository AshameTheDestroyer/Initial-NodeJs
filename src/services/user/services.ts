import { UserModel } from "./schema";
import {
    GetDocuments,
    GetDocumentByID,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

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

export const DeleteAllUSers = DeleteAllDocuments(UserModel);
export const DeleteUserByID = DeleteDocumentByID(UserModel);
