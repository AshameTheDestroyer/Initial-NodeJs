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
export const GetStudentByID: RequestHandlerWithID = (request, response) =>
    StudentModel.findById(request.params.id)
        .then((student) =>
            student == null
                ? response.status(404).send({ message: "Student isn't found." })
                : SubjectModel.find({
                      $or: student.subjects.map((subjectID) => ({
                          _id: subjectID,
                      })),
                  }).then((subjects) =>
                      response.send({
                          ...student["_doc" as keyof typeof student],
                          subjects,
                      }),
                  ),
        )
        .catch(
            (error) => (console.error(error), response.status(500).send(error)),
        );

export const PostStudent = PostDocument(StudentModel);

export const PatchStudent = PatchDocument(StudentModel);

export const DeleteAllStudents = DeleteAllDocuments(StudentModel);
export const DeleteStudentByID = DeleteDocumentByID(StudentModel);
