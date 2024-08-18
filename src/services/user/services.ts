import { UserModel } from "./schema";
import {
    GetDocuments,
    GetDocumentByID,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

export const GetUsers = GetDocuments(UserModel);
export const GetUserByID = GetDocumentByID(UserModel);

export const DeleteAllUSers = DeleteAllDocuments(UserModel);
export const DeleteUserByID = DeleteDocumentByID(UserModel);
