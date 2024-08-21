import { Router } from "express";
import { ValidateAuthenticity, ValidateAuthority } from "../../middleware";
import {
    GetStudents,
    PostStudent,
    PatchStudent,
    GetStudentByID,
    DeleteAllStudents,
    DeleteStudentByID,
} from "./services";

export const STUDENT_ROUTE = "/student";
export const StudentRouter = Router();

StudentRouter.get(STUDENT_ROUTE, ValidateAuthenticity, GetStudents);
StudentRouter.get(`${STUDENT_ROUTE}/:id`, ValidateAuthenticity, GetStudentByID);

StudentRouter.post(STUDENT_ROUTE, ValidateAuthenticity, PostStudent);

StudentRouter.patch(`${STUDENT_ROUTE}/:id`, ValidateAuthenticity, PatchStudent);

// UNTESTED!
StudentRouter.delete(
    STUDENT_ROUTE,
    ValidateAuthenticity,
    ValidateAuthority("admin"),
    DeleteAllStudents,
);
StudentRouter.delete(
    `${STUDENT_ROUTE}/:id`,
    ValidateAuthenticity,
    DeleteStudentByID,
);
