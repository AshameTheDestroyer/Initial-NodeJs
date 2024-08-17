import { UserModel } from "./schema";
import { RequestHandler } from "express";
import { RequestHandlerWithID } from "../../types";
import { GetDocuments, GetDocumentByID } from "../../utils";

export const GetUsers: RequestHandler = GetDocuments(UserModel);
export const GetUserByID: RequestHandlerWithID = GetDocumentByID(UserModel);
