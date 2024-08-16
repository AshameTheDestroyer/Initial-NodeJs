import { Student } from "./schema";
import { RequestHandler } from "express";
import { RequestHandlerWithID } from "@/types";

export const GetAllStudents: RequestHandler = (_request, response) =>
    Student.find()
        .then((students) => response.send(students))
        .catch((error) => response.status(400).send(error));

export const GetStudentByID: RequestHandlerWithID = (request, response) =>
    Student.findById(request.params.id)
        .then((student) =>
            student != null
                ? response.send(student)
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));

export const PostStudent: RequestHandler = (request, response) =>
    new Student(request.body)
        .save()
        .then((student) => response.send(student))
        .catch((error) => response.status(400).send(error));

export const PatchStudent: RequestHandlerWithID = (request, response) =>
    Student.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully updated.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));

export const DeleteAllStudents: RequestHandler = (_request, response) =>
    Student.deleteMany()
        .then((result) =>
            response.send({
                message: `${result.deletedCount} students has been successfully deleted.`,
            }),
        )
        .catch((error) => response.status(400).send(error));

export const DeleteStudentByID: RequestHandlerWithID = (request, response) =>
    Student.findByIdAndDelete(request.params.id)
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully deleted.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));
