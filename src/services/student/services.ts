import { StudentModel } from "./schema";
import { SubjectModel } from "../subject";
import { RequestHandlerWithID } from "../../types";
import {
    PostDocument,
    GetDocuments,
    PatchDocument,
    DeleteAllDocuments,
    DeleteDocumentByID,
} from "../../utils";

export const GetStudents = GetDocuments(StudentModel, "-subjects");
export const GetStudentByID: RequestHandlerWithID = async (
    request,
    response,
) => {
    try {
        const student = await StudentModel.findById(request.params.id);
        if (student == null) {
            return response
                .status(404)
                .send({ message: "Student isn't found." });
        }

        const subjects = await SubjectModel.find({
            $or: student.subjects.map((subjectID) => ({
                _id: subjectID,
            })),
        });

        return response.send({
            ...student["_doc" as keyof typeof student],
            subjects,
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

export const PostStudent = PostDocument(StudentModel);

export const PatchStudent = PatchDocument(StudentModel);

export const DeleteAllStudents = DeleteAllDocuments(StudentModel);
export const DeleteStudentByID = DeleteDocumentByID(StudentModel);
