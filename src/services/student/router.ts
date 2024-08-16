import { Router } from "express";
import { Student } from "./schema";

export const STUDENT_ROUTE = "/student";
export const StudentRouter = Router();

StudentRouter.get(STUDENT_ROUTE, (_request, response) =>
    Student.find()
        .then((students) => response.send(students))
        .catch((error) => response.status(400).send(error)),
);

StudentRouter.get(`${STUDENT_ROUTE}/:id`, (request, response) =>
    Student.findById(request.params.id)
        .then((student) =>
            student != null
                ? response.send(student)
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error)),
);

StudentRouter.post(STUDENT_ROUTE, (request, response) =>
    new Student(request.body)
        .save()
        .then((student) => response.send(student.id))
        .catch((error) => response.status(400).send(error)),
);

StudentRouter.patch(`${STUDENT_ROUTE}/:id`, (request, response) =>
    Student.findByIdAndUpdate(request.params.id, request.body, { new: true })
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully updated.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error)),
);

StudentRouter.delete(STUDENT_ROUTE, (_request, response) =>
    Student.deleteMany()
        .then((result) =>
            response.send({
                message: `${result.deletedCount} students has been successfully deleted.`,
            }),
        )
        .catch((error) => response.status(400).send(error)),
);

StudentRouter.delete(`${STUDENT_ROUTE}/:id`, (request, response) =>
    Student.findByIdAndDelete(request.params.id)
        .then((student) =>
            student != null
                ? response.send({
                      message: "Student has been successfully deleted.",
                  })
                : response.status(404).send({ message: "Student not found." }),
        )
        .catch((error) => response.status(400).send(error)),
);
