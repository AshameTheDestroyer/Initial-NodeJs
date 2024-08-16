import { StudentModel } from "./schema";
import { RequestHandler } from "express";
import { RequestHandlerWithID } from "../../types";
import { GetPaginationOptions, GetSortOptions } from "../../utils";

export const GetStudents: RequestHandler = (request, response) =>
    StudentModel.find({}, {}, GetPaginationOptions(request))
        .sort(GetSortOptions(request))
        .then((students) =>
            StudentModel.countDocuments().then((totalCount) =>
                response.send({ totalCount, data: students }),
            ),
        )
        .catch((error) => response.status(400).send(error));

export const GetStudentByID: RequestHandlerWithID = (request, response) =>
    StudentModel.findById(request.params.id)
        .then((student) =>
            student != null
                ? response.send(student)
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));

export const PostStudent: RequestHandler = (request, response) =>
    new StudentModel(request.body)
        .save()
        .then((student) => response.send(student))
        .catch((error) => response.status(400).send(error));

export const PatchStudent: RequestHandlerWithID = (request, response) =>
    StudentModel.findByIdAndUpdate(request.params.id, request.body, {
        new: true,
    })
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully updated.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));

export const DeleteAllStudents: RequestHandler = (_request, response) =>
    StudentModel.deleteMany()
        .then((result) =>
            response.send({
                message: `${result.deletedCount} students has been successfully deleted.`,
            }),
        )
        .catch((error) => response.status(400).send(error));

export const DeleteStudentByID: RequestHandlerWithID = (request, response) =>
    StudentModel.findByIdAndDelete(request.params.id)
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully deleted.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error));
