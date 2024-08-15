import { Router } from "express";
import { Student } from "./schema";

export const StudentRouter = Router();

StudentRouter.route("/student(/:id)?")
    .get((request, response) =>
        (request.params.id != null
            ? Student.findById(request.params.id).then((student) =>
                  student != null
                      ? response.send(student)
                      : response.status(404).send("Student not found."),
              )
            : Student.find().then((result) => response.send(result))
        ).catch((error) => response.status(400).send(error)),
    )
    .post((request, response) =>
        new Student(request.body)
            .save()
            .then((student) => response.send(student._id))
            .catch((error) => response.status(400).send(error)),
    )
    .patch((request, response) =>
        Student.findByIdAndUpdate(request.params.id, request.body, {
            new: true,
        })
            .then((student) =>
                student != null
                    ? response.send("Student updated.")
                    : response.status(404).send("Student not found."),
            )
            .catch((error) => response.status(400).send(error)),
    )
    .delete((request, response) =>
        (request.params.id != null
            ? Student.findByIdAndDelete(request.params.id)
            : Student.deleteMany()
        )
            .then(() =>
                response.send(
                    request.params.id != null
                        ? "Student deleted."
                        : "All students deleted.",
                ),
            )
            .catch((error) => response.status(400).send(error)),
    );
