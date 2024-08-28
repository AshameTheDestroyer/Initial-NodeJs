import { Router } from "express";
import {
    ValidateRateLimit,
    ValidateAuthority,
    ValidateAuthenticity,
} from "../../middleware";
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

StudentRouter.get(
    STUDENT_ROUTE,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetStudents,
);
StudentRouter.get(
    `${STUDENT_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    GetStudentByID,
);

StudentRouter.post(
    STUDENT_ROUTE,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PostStudent,
);

StudentRouter.patch(
    `${STUDENT_ROUTE}/:id`,
    ValidateAuthenticity,
    ValidateRateLimit(),
    PatchStudent,
);

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
    ValidateRateLimit(),
    DeleteStudentByID,
);
