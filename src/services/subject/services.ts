import { SubjectModel } from "./schema";
import {
    PostDocument,
    GetDocuments,
    PatchDocument,
    GetDocumentByID,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

export const GetSubjects = GetDocuments(SubjectModel);
export const GetSubjectByID = GetDocumentByID(SubjectModel);

export const PostSubject = PostDocument(SubjectModel);

export const PatchSubject = PatchDocument(SubjectModel);

export const DeleteAllSubjects = DeleteAllDocuments(SubjectModel);
export const DeleteSubjectByID = DeleteDocumentByID(SubjectModel);
