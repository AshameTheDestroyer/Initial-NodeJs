import { StudentModel } from "./schema";
import {
    PostDocument,
    GetDocuments,
    PatchDocument,
    GetDocumentByID,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

export const GetStudents = GetDocuments(StudentModel);
export const GetStudentByID = GetDocumentByID(StudentModel);

export const PostStudent = PostDocument(StudentModel);

export const PatchStudent = PatchDocument(StudentModel);

export const DeleteAllStudents = DeleteAllDocuments(StudentModel);
export const DeleteStudentByID = DeleteDocumentByID(StudentModel);
